
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show users list</title>

<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
}
.btn {
    padding: 3px;
    display: inline-block;
    border: 1px solid black;
    border-radius: 3px;
    cursor: pointer;
}
.btn:hover {
    background-color: #EEE;
}
</style>
</head>
<body>
<?php
    require_once 'config.php';
?>

    <table>
        <tr>
            <td>
            <h1> ADD NEW USER </h1>
            <?php 
                if(isset($_GET['useradd'])) {
                    if(
                        "" != trim($_POST['privatekey']) && 
                        "" != trim($_POST['contact']) && 
                        "" != trim($_POST['serverinfo']) && 
                        "" != trim($_POST['domain']) && 
                        "" != trim($_POST['apicryptkey']) && 
                        "" != trim($_POST['other']) && 
                        "" != trim($_POST['end_subscribe'])
                        )
                    {
                        $database->insert("users", [
                            "privatekey" => $_POST['privatekey'],
                            "contact" => $_POST['contact'],
                            "serverinfo" => $_POST['serverinfo'],
                            "domain" => $_POST['domain'],
                            "apicryptkey" => $_POST['apicryptkey'],
                            "other" => $_POST['other'],
                            "end_subscribe" => $_POST['end_subscribe']
                        ]);
                        ?>
                        <h5 style="color:green;">User added</h5>
                        <?php
                    }
                    else {
                        ?>
                        <h5 style="color:red;">fill all inputs</h5>
                        <?php
                    }
                }
            ?>
                <form action="?useradd" method="post" autocomplete="off">
                    <table>
                        <tr>
                            <td>
                                PrivateKey: <textarea type="text" id="privatekey" name="privatekey"></textarea> <a class="btn" onclick="document.getElementById('privatekey').value=randomString(128);">Generate</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contact: <input type="text" name="contact">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                ServerInfo: <textarea type="text" name="serverinfo" cols="40" rows="5"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                domain: <input type="text" name="domain">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                apicryptkey: <input type="text" id="apicryptkey" name="apicryptkey"> <a class="btn" onclick="document.getElementById('apicryptkey').value=randomString(13);">Generate</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                other: <textarea type="text" name="other" cols="40" rows="5"></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                end_subscribe: <input type="text" name="end_subscribe">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit">
                            </td>
                        </tr>
                    </table>
                </form>
            </td>
            <td>
            <h1>Edit user</h1>
            <?php
                if(isset($_GET['edituser'])) {
                    
                    if(
                        "" != trim($_POST['privatekey']) && 
                        "" != trim($_POST['contact']) && 
                        "" != trim($_POST['serverinfo']) && 
                        "" != trim($_POST['domain']) && 
                        "" != trim($_POST['apicryptkey']) && 
                        "" != trim($_POST['other']) && 
                        "" != trim($_POST['end_subscribe'])
                        )
                        {
                            $database->update("users", [
                                "privatekey" => $_POST['privatekey'],
                                "contact" => $_POST['contact'],
                                "serverinfo" => $_POST['serverinfo'],
                                "domain" => $_POST['domain'],
                                "apicryptkey" => $_POST['apicryptkey'],
                                "other" => $_POST['other'],
                                "end_subscribe" => $_POST['end_subscribe']
                            ], [
                                "ID" => $_GET['edituser']
                            ]);
                            echo 'UPDATED';
                        }
                    $userdata = $database->get("users", "*", [
                        "ID" => $_GET['edituser']
                    ]);
            ?>
                <h5>Current user id = <?php echo $userdata['ID']; ?></h5>
                <form action="?edituser=<?php echo $userdata['ID']; ?>" method="post" autocomplete="off">
                    <table>
                        <tr>
                            <td>
                                PrivateKey: <textarea type="text" id="privatekeyed" name="privatekey"><?php echo $userdata['privatekey']; ?></textarea> <a class="btn" onclick="document.getElementById('privatekeyed').value=randomString(128);">Generate new</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contact: <input type="text" name="contact" value="<?php echo $userdata['contact']; ?>">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                ServerInfo: <textarea type="text" name="serverinfo" cols="40" rows="5"><?php echo $userdata['serverinfo']; ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                domain: <input type="text" name="domain" value="<?php echo $userdata['domain']; ?>">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                apicryptkey: <input type="text" id="apicryptkeyed" name="apicryptkey" value="<?php echo $userdata['apicryptkey']; ?>"></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                other: <textarea type="text" name="other" cols="40" rows="5"><?php echo $userdata['other']; ?></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                end_subscribe: <input type="text" name="end_subscribe" value="<?php echo $userdata['end_subscribe']; ?>">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit">
                            </td>
                        </tr>
                    </table>
                </form>
                <?php 
                }
                else {
                    ?>

                    <h5 style="color:orange;">select user to edit</h5>
                    <?php
                }
                ?>
            </td>
        </tr>
    </table>
    <h1>Users list</h1>
    <?php
    if(isset($_GET['removeuser'])) {
        $data = $database->delete("users", [
            "ID" => $_GET['removeuser']
        ]);
        echo '<br><h5 style="color:green">User id '.$_GET['removeuser'].' removed</h5>';
        }
    ?>
        <table style="width:100%">
        <tr>
            <th>ID</th>
            <th>Private key</th>
            <th>Contact</th>
            <th>Server Info</th>
            <th>Domain</th>
            <th>Crypt Key</th>
            <th>Other info</th>
            <th>License end subscribe</th>
            <th>Avalible days</th>
            <th></th>
        </tr>
        <?php

        $datas = $database->select("users", "*");
        foreach($datas as $data)
        {
            echo "<tr><td>".
                $data["ID"] . "</td><td>" . 
                "<textarea readonly>".$data["privatekey"] . "</textarea></td><td>" .
                $data["contact"] . "</td><td>" .
                "<textarea readonly>" . $data["serverinfo"] . "</textarea></td><td>" .
                $data["domain"] . "</td><td>" .
                $data["apicryptkey"] . "</td><td>" .
                $data["other"] . "</td><td>" .
                $data["end_subscribe"] . "</td><td><b style=\"color:". ((getValidDaysSubscribe($data["end_subscribe"]) > 5) ? "green" : "red") .";\">" .
                getValidDaysSubscribe($data["end_subscribe"]) . "</b></td><td>" . 
                '<a class="btn" href="?edituser=' . $data["ID"] . '">EDIT</a><br>' . 
                '<a class="btn" href="?removeuser=' . $data["ID"] . '">REMOVE</a>' . "</td></tr>";
        }
        ?>
        </table>
</body>
<script>
function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
    </script>
</html>
