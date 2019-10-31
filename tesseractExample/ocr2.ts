import { createWorker } from 'tesseract.js';

const worker = createWorker();

(async () => {
    await worker.load();
    await worker.loadLanguage('spa');
    await worker.initialize('spa');
    const { data: { text } } = await worker.recognize('http://localhost:8888/puton.jpeg');
    console.log(text);
    await worker.terminate();
})();