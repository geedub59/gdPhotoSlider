<?php
/*-----------------------------------------------------------------------------*
Module Name: _gd_returnJSON.php
Description: This module returns a list of image files as a JSON formatted string
Mod Date...: 11/10/2018
 *-----------------------------------------------------------------------------*/
// include_once "_gd_CopyrightNotice.php";

if (isset($_GET["sourceDir"])) {
    $sourceDir = $_GET["sourceDir"];

    // $file = fopen("__phplog.txt", "a");
    // fwrite($file, $sourceDir."\n");
    // fclose($file);

    chdir("..");
    
    // 1. make sure sourceDir exists
    if (file_exists($sourceDir)) {
        // 2. change to the sourceDir directory
        if (chdir($sourceDir)) {
            if ($sourceDir == "albums") {
                // 3. get a list of albums
                $albums = glob("*", GLOB_ONLYDIR);
                // 4. return as a JSON string
                echo json_encode($albums);
                exit;
            } else {
                // 3. get a list of photo filenames (*.jpg, *.png)
                $photoFiles = glob("{*.jpg,*.JPG,*.png,*.PNG,*.tif,*.TIF,*.bmp,*.BMP}", GLOB_BRACE);
                // 4. return as a JSON string
                echo json_encode($photoFiles);
                exit;
            }
        }
    }
}
echo 0;
