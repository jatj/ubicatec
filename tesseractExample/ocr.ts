// import { injectable } from "tsyringe";
import { createWorker } from 'tesseract.js';

/**
 * Provides an OCR for extracting text from images
 */
// @injectable()
export class OcrService {
    /**
     * Extracts text from an image
     * @param imageUrl URL of the image to be analyzed
     */
    public static async textFromImage(imageUrl: string): Promise<string> {
        const worker = createWorker();

        await worker.load();
        await worker.loadLanguage('spa');
        await worker.initialize('spa');
        const { data: { text } } = await worker.recognize(imageUrl);
        console.log(text);
        await worker.terminate();

        return text;
    }

    
    /**
     * Extracts useful data from a Tec credential
     * @param imageUrl URL of the credential to be analyzed
     */
    public static async scanCredential(imageUrl: string): Promise<CredentialDetails> {
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
            while ((!credentialDetails.carrera.match(carreraRegex) && contador < lines.length - 1)){
                credentialDetails.carrera = lines[contador].substr(0, 3);
                contador++;
            }

            return credentialDetails;
        }                
    }
}

export class CredentialDetails {
    constructor(
        public matricula?: string,
        public nombre?: string,
        public carrera?: string
    ){}
}

(async () => {
    let credential = await OcrService.scanCredential("http://localhost:8888/fotos/puton.jpeg");
    console.log(credential);
    let credential1 = await OcrService.scanCredential("http://localhost:8888/fotos/jotin.jpeg");
    console.log(credential1);
    let credential2 = await OcrService.scanCredential("http://localhost:8888/fotos/jotino.jpeg");
    console.log(credential2);
    let credential3 = await OcrService.scanCredential("http://localhost:8888/fotos/elver.jpeg");    
    console.log(credential3);
})();
