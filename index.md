<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2048</title>
    <link rel="stylesheet" href="style.css">
    
    
</head>
<body>
    <h1>2048!</h1>
    <h2 class="score"></h2>
    <p>Use left, right, up, and down arrow keys. Try to make 2048 without getting stuck!</p>
    <h3 class="result"></h3>
    
    <div class="container">
        <div class="grid">
            <table style="width:100%">
                <tr>
                    <td style="text-align:center"><span id="0"></span></td>
                    <td style="text-align:center"><span id="1"></span></td>
                    <td style="text-align:center"><span id="2"></span></td>
                    <td style="text-align:center"><span id="3"></span></td>
                </tr>
                <tr>
                    <td style="text-align:center"><span id="4"></span></td>
                    <td style="text-align:center"><span id="5"></span></td>
                    <td style="text-align:center"><span id="6"></span></td>
                    <td style="text-align:center"><span id="7"></span></td>
                </tr>
                <tr>
                    <td style="text-align:center"><span id="8"></span></td>
                    <td style="text-align:center"><span id="9"></span></td>
                    <td style="text-align:center"><span id="10"></span></td>
                    <td style="text-align:center"><span id="11"></span></td>
                </tr>
                <tr>
                    <td style="text-align:center"><span id="12"></span></td>
                    <td style="text-align:center"><span id="13"></span></td>
                    <td style="text-align:center"><span id="14"></span></td>
                    <td style="text-align:center"><span id="15"></span></td>
                </tr>
            </table>
        </div>
        <button type="button">Reset Game</button>
    </div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="module" src="engine/controller.js" charset="utf-8"></script>
</body>
</html>
