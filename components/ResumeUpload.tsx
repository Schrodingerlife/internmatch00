import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { parseResumeWithGemini } from '../services/geminiService';
import { UserProfile } from '../types';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface ResumeUploadProps {
    onProfileUpdate: (profile: Partial<UserProfile>) => void;
    onClose: () => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onProfileUpdate, onClose }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const extractTextFromPDF = async (file: File): Promise<string> => {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n';
        }

        return fullText;
    };

    const handleFile = async (file: File) => {
        if (file.type !== 'application/pdf') {
            setError('Por favor, envie apenas arquivos PDF.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const text = await extractTextFromPDF(file);
            const extractedData = await parseResumeWithGemini(text);

            if (extractedData) {
                onProfileUpdate(extractedData);
                setSuccess(true);
                setTimeout(onClose, 2000);
            } else {
                throw new Error('Falha ao analisar o currículo.');
            }
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao processar seu currículo. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-white ring-1 ring-gray-200 p-6">

                <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} className="text-gray-400" />
                </button>

                <div className="text-center mb-8 mt-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                        <FileText size={32} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-textDark">Upload de Currículo</h2>
                    <p className="text-textLight mt-2">Envie seu PDF e nossa IA preencherá seu perfil automaticamente.</p>
                </div>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-textDark">Sucesso!</h3>
                        <p className="text-emerald-600 font-medium">Perfil atualizado com sucesso.</p>
                    </div>
                ) : (
                    <div
                        className={`
                    border-3 border-dashed rounded-3xl p-10 text-center transition-all duration-300 cursor-pointer
                    ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}
                    ${error ? 'border-error/50 bg-error/5' : ''}
                `}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                        />

                        {isLoading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 size={48} className="text-primary animate-spin mb-4" />
                                <p className="font-bold text-textDark">Analisando com IA...</p>
                                <p className="text-xs text-textLight mt-1">Isso pode levar alguns segundos</p>
                            </div>
                        ) : (
                            <>
                                <Upload size={48} className={`mx-auto mb-4 ${isDragging ? 'text-primary' : 'text-gray-300'}`} />
                                <p className="font-bold text-textDark text-lg">Clique ou arraste aqui</p>
                                <p className="text-sm text-textLight mt-1">Suporta apenas arquivos PDF</p>
                            </>
                        )}
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-3 bg-red-50 rounded-xl flex items-center gap-2 text-error text-sm font-bold">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
