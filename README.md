# Music Player
A simple music player, written in PHP (backend) and Ionic (frontend).

## Database Structure
![Database Structure](frontend/public/assets/img/erd.png)

## Features
- Play music with a simple web interface
- Play music from a local folder
- Play music from a remote folder
- Add music to a playlist
- Artist, album and song information
- Metadata source from spotify

## Requirements
- PHP 7.3 or higher
- Composer
- NodeJS (V18 or higher)

## Installation (Backend)
1. Clone the repository
2. type `composer install` in the root folder
3. Edit `.env` and set database credentials
4. run `php artisan serve` to start the server [dev only]

## Installation (Frontend)
1. type `npm install` in the root folder
2. edit `config.json` and set the backend url
3. run `ionic serve` to start the server [dev only]

**Note:** The application is not yet ready for production.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
