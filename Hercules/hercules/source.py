from androguard.misc import AnalyzeDex

import sys

from hercules import Utils

def getStringsClassSource(a, d, dx, DEXFileLocation):
	target=""
	init=""
	
	main=a.get_main_activity()
	if(main[-12:]=="MainActivity"):
		print("Looks like this sample isn't Cerberus, maybe Anubis.")
	
	spl=main.split(".")
	outer=""
	print(main)
	for m in spl[:-1]:
		outer+=m+"."
	
	h, d, dx = AnalyzeDex(DEXFileLocation)
	
	lst=[]
	target_obj=dx.classes[Utils.javaish(main)]
	for meth in target_obj.get_methods():
		if(meth.get_method().get_name() == "<init>"):
			for line in meth.get_method().get_source().splitlines():
				btw=Utils.between(line, "= new ", "();") 
				if( outer[:-1] in btw):
					lst.append(btw)
	
	lst = list(dict.fromkeys(lst))
	
	for sinif in lst:
		sin=dx.classes[Utils.javaish(sinif)]
		for meth in sin.get_methods():
			if(meth.get_method().get_name() == "<init>"):
				cfg_src=meth.get_method().get_source()
				break
	
	return cfg_src



