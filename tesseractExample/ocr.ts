// import { injectable } from "tsyringe";
import * as imageGrayScale from 'image-grayscale';
import * as imageDownloader from 'image-downloader';
import * as path from 'path';
import * as fs from 'fs';
import { createWorker } from 'tesseract.js';
import { Logger } from '@conectasystems/tools';

/**
 * Provides an OCR for extracting text from images
 */
// @injectable()
export class OcrService {
    public static worker;
    public static async init(){
        this.worker = createWorker();

        await this.worker.load();
        await this.worker.loadLanguage('spa');
        await this.worker.initialize('spa');
        return this.worker;
    }
    public static async terminate(){
        await this.worker.terminate();
    }
    /**
     * Extracts text from an image
     * @param imageUrl URL of the image to be analyzed
     */
    public static async textFromImage(imageUrl: string): Promise<string> {
        // const { data: { text } } = await this.worker.recognize(await this.applyFilter(imageUrl));
        const { data: { text } } = await this.worker.recognize(imageUrl);
        return text;
    }

    public static async applyFilter(imageUrl: string) {
        try {
            let { filename, image } = await imageDownloader.image({
                url: imageUrl,
                dest: path.resolve(__filename, '../')
            });
            let buff = await imageGrayScale(filename, {
                algorithm: function (r, g, b, a) {
                    return ( Math.max(r, g, b) + Math.min(r, g, b) ) / 2;
                },
                bufferMode: true
            });
            fs.unlinkSync(filename);
            fs.writeFileSync(filename, buff);
            return buff;
        } catch (error) {
            throw error;
        }
    }


    /**
     * Extracts useful data from a Tec credential
     * @param imageUrl URL of the credential to be analyzed
     */
    public static async scanCredential(imageUrl: string): Promise<CredentialDetails> {
        if(this.results.has(imageUrl)){
            let result = this.results.get(imageUrl);
            this.results.delete(imageUrl);
            return result
        }
        let rawText: string;
        let credentialDetails: CredentialDetails = new CredentialDetails();
        let matriculaRegex: RegExp = /[AL](\d{8})/gi;
        let nombreRegex: RegExp = /^([a-zA-Z\s]+)/g;
        let carreraRegex: RegExp = /^[a-zA-Z]{3}/g;
        let matriculaMatch;
        let lines: string[];

        rawText = await OcrService.textFromImage(imageUrl);

        // Split text in lines
        lines = rawText.split(/\r?\n/);

        for (let i = 0; i < lines.length; i++) {
            matriculaMatch = matriculaRegex.exec(lines[i]);

            if (!matriculaMatch) {
                continue;
            }

            credentialDetails.matricula = lines[i].match(matriculaRegex).toString().trim();
            credentialDetails.nombre = lines[i + 1].match(nombreRegex).toString().trim();
            credentialDetails.carrera = lines[i + 2].substr(0, 3);

            // Verify Carrera
            let contador = i + 3;
            while ((!credentialDetails.carrera.match(carreraRegex) && contador < lines.length - 1)) {
                credentialDetails.carrera = lines[contador].substr(0, 3);
                contador++;
            }
            this.results.set(imageUrl, credentialDetails);
            return credentialDetails;
        }
    }

    public static results = new Map<string, CredentialDetails>();
}

export class CredentialDetails {
    constructor(
        public matricula?: string,
        public nombre?: string,
        public carrera?: string
    ) { }
}

(async () => {
    await OcrService.init();
    console.log(new Date().getTime())
    let credential = await OcrService.scanCredential("http://10.49.184.48:8888/fotos/puton.jpeg");
    console.log(new Date().getTime())
    console.log(credential);
    let credential1 = await OcrService.scanCredential("http://10.49.184.48:8888/fotos/jotin.jpeg");
    console.log(new Date().getTime())
    console.log(credential1);
    let credential2 = await OcrService.scanCredential("http://10.49.184.48:8888/fotos/jotino.jpeg");
    console.log(new Date().getTime())
    console.log(credential2);
    let credential3 = await OcrService.scanCredential("http://10.49.184.48:8888/fotos/elver.jpeg");
    console.log(new Date().getTime())
    console.log(credential3);
    // await OcrService.applyFilter('http://10.49.184.48:8888/fotos/elver.jpeg');
})();
