import {
    FileText,
    FileArchive,
    Image,
    Wand2,
    Maximize2,
    RefreshCw,
    FileBadge,
    FileEdit,
    ScrollText,
    Sparkles,
    CheckCheck,
    Languages,
    ScanLine,
    QrCode
} from 'lucide-react';

export const CARD_COLORS = [
    "#a78bfa", 
    "#60a5fa", 
    "#67e8f9", 
    "#86efac", 
    "#fcd34d", 
    "#fca5a5", 
    "#f9a8d4",
    "#5eead4", 
];

export const ALL_TOOLS_DATA = [
    {
        id: 1,
        title: "Word to PDF Converter",
        description: "Convert Microsoft Word documents into professional, highly accurate PDF layouts instantly.",
        category: "Document Tools",
        icon: FileText,
        route: "/tools/word-to-pdf"
    },
    {
        id: 2,
        title: "PDF Compressor",
        description: "Optimize and reduce PDF payload sizes without reducing vector asset crispness or text legibility.",
        category: "Document Tools",
        icon: FileArchive,
        route: "/tools/pdf-compressor"
    },
    {
        id: 3,
        title: "Image Compressor",
        description: "Compress large image formats aggressively while retaining near-identical original visual fidelity.",
        category: "Image Tools",
        icon: Image,
        route: "/tools/image-compressor"
    },
    {
        id: 4,
        title: "Background Remover",
        description: "Isolate subjects and eliminate complex photographic background layers with precise, model-driven accuracy.",
        category: "Image Tools",
        icon: Wand2,
        route: "/tools/background-remover"
    },
    {
        id: 5,
        title: "AI Image Upscaler",
        description: "Enhance, de-noise, and upscale low-resolution image assets into production-ready resolutions.",
        category: "Image Tools",
        icon: Maximize2,
        route: "/tools/image-upscaler"
    },
    {
        id: 6,
        title: "Image Format Converter",
        description: "Transcode photographic file extensions smoothly into highly compressed next-gen variants.",
        category: "Image Tools",
        icon: RefreshCw,
        route: "/tools/format-converter"
    },
    {
        id: 7,
        title: "AI Resume Builder",
        description: "Generate structured, high-scoring, ATS-optimized professional resumes using smart tailored blocks.",
        category: "Writing Tools",
        icon: FileBadge,
        route: "/tools/ai-resume-builder"
    },
    {
        id: 8,
        title: "AI Cover Letter Generator",
        description: "Formulate contextual, highly compelling application narratives tailored to enterprise job mandates.",
        category: "Writing Tools",
        icon: FileEdit,
        route: "/tools/ai-cover-letter"
    },
    {
        id: 9,
        title: "AI Text Summarizer",
        description: "Parse extensive documents, lengthy essays, and whitepapers down into clean, actionable executive takeaways.",
        category: "Writing Tools",
        icon: ScrollText,
        route: "/tools/text-summarizer"
    },
    {
        id: 10,
        title: "AI Paraphrasing Tool",
        description: "Re-engineer phrasing and tone variations while perfectly capturing and securing foundational context layouts.",
        category: "Writing Tools",
        icon: Sparkles,
        route: "/tools/paraphraser"
    },
    {
        id: 11,
        title: "AI Grammar Checker",
        description: "Scan writing assets for syntactic, stylistic, and grammatical anomalies in real time.",
        category: "Writing Tools",
        icon: CheckCheck,
        route: "/tools/grammar-checker"
    },
    {
        id: 12,
        title: "AI Translator",
        description: "Localize sophisticated multi-lingual bodies smoothly across regional context structures.",
        category: "Productivity Tools",
        icon: Languages,
        route: "/tools/ai-translator"
    },
    {
        id: 13,
        title: "AI OCR (Image to Text)",
        description: "Extract clean, editable strings from unselectable scanned document files or flat imagery fields.",
        category: "Productivity Tools",
        icon: ScanLine,
        route: "/tools/ai-ocr"
    },
    {
        id: 14,
        title: "AI QR Code Generator",
        description: "Generate beautiful custom vector-styled tracking targets built with advanced data recovery parameters.",
        category: "AI Utilities",
        icon: QrCode,
        route: "/tools/qr-generator"
    }
];