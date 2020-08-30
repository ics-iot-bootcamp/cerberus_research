from androguard.misc import AnalyzeAPK

import sys
import re
from zipfile import ZipFile

from hercules import Utils

target=""
init=""
decoded=""

def set_target(kla):
	lst = []
	klas=dx.find_classes(kla)
	for clazz in klas:
		methods=clazz.get_methods()
		for method in methods:
			for _, call, _ in method.get_xref_to():
				if(call.class_name == "Ljava/io/OutputStream;"):
					global target
					target=kla
					return lst
				lst.append(call.class_name)
	return lst

#It works, but more accurate way needed
def guess_encrypted_file():
	with ZipFile(sys.argv[1], 'r') as zipObj:
		listOfiles = zipObj.infolist()
		for elem in listOfiles:
			if("assets/"==elem.filename[0:7] and elem.filename[-5:]==".json" and elem.file_size > 450000 ):
				return elem.filename



def bruteforce(lst):
	for i in range(len(lst)):
		for j in range(len(lst)):
			key= lst[i]
			keykey= lst[j]
			key=Utils.xor_dec(key, keykey)
			if("vcjudfuydsy"==key):
				print("Looks like we are in the wrong way")
			isDecrypted, decrypted=Utils.RC4_dec_dex(decoded, key, "extracted.dex")
			if(isDecrypted):
				print("Succesfully decrypted dex")
				print("Key was:", key)
				return decrypted
			else:
				print("Trying again...")

def cmiyc(mlas):
	for method in mlas.get_methods():
		if method.is_external():
			continue
		m = method.get_method()
		prev=""
		prev_n=""
		if(m.get_name()=="<init>"):
			global init
			init=m.get_source()
		for idx, ins in m.get_instructions_idx(): 	#https://github.com/androguard/androguard/issues/793
			curr=ins.get_output()
			if("iget-object" in ins.get_name()):
				anyway=ins.get_output()
			if("getClass()" in curr or "getBytes()" in curr):
				if("iget-object"==prev_n):
					return prev
			prev_n=ins.get_name()
			prev=curr
	return anyway



def decrypt(at, dt, dxt, apkFileName):
	global a
	a=at
	global d
	d=dt
	global dx
	dx=dxt

	main=a.get_main_activity()
	if(main[-12:]=="MainActivity"):
		print("Looks like this sample isn't Cerberus, maybe Anubis. If you are confident about this is Cerberus, please report it to the group.")
	
	arg=a.get_attribute_value("application","name")
		
	encrypted_name=guess_encrypted_file()
	
	if(encrypted_name):
		global decoded
		decoded = a.get_file(encrypted_name)
		lst=set_target(Utils.javaish(arg))
			
		
	
	if encrypted_name:
		for element in lst:
			if(target!=""):
				break
			set_target(element)
	
	
		target_obj=dx.classes[target]
		target_method=cmiyc(target_obj)
	
	
		for line in init.splitlines():
			if(Utils.between(target_method, ">", " ") in line):
				rgx = re.findall(r'(?<='+Utils.dejavaish(target.decode()).replace(".","\.")+'\.)(.*?)(?=\()', line)
				if(len(rgx) > 1):
					target_method=rgx[1]
				else:
					target_method=rgx[0]

		lst = []
		for meth in target_obj.get_methods():
			if(meth.get_method().get_name()==target_method):
				for line in meth.get_method().get_source().splitlines():
					btw=Utils.between(line, " = {", "};") #
					if(btw!=""):
						lst.append(list(map(int, btw.split(","))))
		
	
		return bruteforce(lst), encrypted_name
	else:
		print("Main module not packed. Skipping dropper decryption step.")
		with ZipFile(apkFileName) as z:
	     			return z.read('classes.dex'), "Not Encrypted"
