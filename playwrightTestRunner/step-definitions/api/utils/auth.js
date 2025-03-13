import fs from 'fs';
import path from 'path';
export async function getAuthToken(request) {
    // __dirname for CommonJS only.
    // const currentDir = new URL('.', import.meta.url).pathname;
    // const projectRootDir = path.resolve(currentDir, '../../../..');
    const projectRootDir = process.cwd();
    const configFilePath = path.join(projectRootDir, 'configs', 'config.api.json');
    const jsonData = JSON.parse(fs.readFileSync(configFilePath, 'utf8'));

    const apiBaseUrl = jsonData.apiBaseUrl;
    const { email, password } = jsonData.user;

    const response = await request.post(`${apiBaseUrl}/api/login`, {
        data: {
            username: email,
            password: password
        }
    });

    if (response.ok()) {
        const data = await response.json();
        const token = data.token;
        if (!token) {
            throw new Error('Token not found!');
        }
        return token;
    } else {
        throw new Error('Failed to retrieve token: ' + response.status());
    }
}
