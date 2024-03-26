import fs from "fs";
import multer from "multer";
import path from 'path';

let PROFILES_DATA = null;
let LOGIN_DATA = null;

fs.readFile('profiles.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
    }
    PROFILES_DATA = JSON.parse(data);
});

fs.readFile('loginInfo.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка чтения файла:', err);
        return;
    }
    LOGIN_DATA = JSON.parse(data);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'D:\\IDE\\WebStorm 2023.2.1\\projects\\MeetHubClient\\client\\src\\assets\\img'); // Папка для загруженных файлов
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        const fileExtension = originalName.split('.').pop();
        cb(null, `${req.params.id}_image.${fileExtension}`);
    }
});

export function copyDirectory(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            // Рекурсивно копируем поддиректории
            copyDirectory(srcPath, destPath);
        } else {
            // Копируем файл
            fs.copyFileSync(srcPath, destPath);
        }
    }
}


const upload = multer({ storage });

export { PROFILES_DATA, upload, LOGIN_DATA };