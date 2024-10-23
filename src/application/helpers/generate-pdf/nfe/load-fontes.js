"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFontsNFCe = exports.loadFonts = void 0;
const path_1 = __importDefault(require("path"));
function loadFonts(doc) {
    const diretorioDeFontes = path_1.default.join(__dirname, './../fontes');
    const timesNewRoman = path_1.default.join(diretorioDeFontes, 'Times New Roman.ttf');
    const timesNewRomanNegrito = path_1.default.join(diretorioDeFontes, 'Times New Roman Bold.ttf');
    const timesNewRomanItalico = path_1.default.join(diretorioDeFontes, 'Times New Roman Italic.ttf');
    const timesNewRomanNegritoItalico = path_1.default.join(diretorioDeFontes, 'Times New Roman Bold Italic.ttf');
    doc.registerFont('normal', timesNewRoman);
    doc.registerFont('negrito', timesNewRomanNegrito);
    doc.registerFont('italico', timesNewRomanItalico);
    doc.registerFont('negrito-italico', timesNewRomanNegritoItalico);
}
exports.loadFonts = loadFonts;
function loadFontsNFCe(doc) {
    const diretorioDeFontes = path_1.default.join(__dirname, './../fontes/roboto-condensed');
    const normal = path_1.default.join(diretorioDeFontes, 'RobotoCondensed-Regular.ttf');
    const negrito = path_1.default.join(diretorioDeFontes, 'RobotoCondensed-Bold.ttf');
    const italico = path_1.default.join(diretorioDeFontes, 'RobotoCondensed-Italic.ttf');
    const negritoItalico = path_1.default.join(diretorioDeFontes, 'RobotoCondensed-BoldItalic.ttf');
    doc.registerFont('normal', normal);
    doc.registerFont('negrito', negrito);
    doc.registerFont('italico', italico);
    doc.registerFont('negrito-italico', negritoItalico);
}
exports.loadFontsNFCe = loadFontsNFCe;
//# sourceMappingURL=load-fontes.js.map