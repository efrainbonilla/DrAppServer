<?php
/**
 * Created by PhpStorm.
 * User: efrain
 * Date: 20/12/14
 * Time: 02:17 AM
 */

namespace AppBundle;

use Composer\Script\Event;

class HerokuDatabase {
    public static function populateEnviroment(Event $event){
        $url = getenv("DATABASE_URL");

        if ($url) {
            $url = parse_url($url);
            putenv("DATABASE_HOST={$url['host']}");
            putenv("DATABASE_USER={$url['user']}");
            putenv("DATABASE_PASSWORD={$url['pass']}");
            $db = substr($url['path'],1);
            putenv("DATABASE_NAME={$db}");
        }

        $io = $event->getIO();

        $io->write("DATABASE_URL=".getenv("DATABASE_URL"));
    }
}