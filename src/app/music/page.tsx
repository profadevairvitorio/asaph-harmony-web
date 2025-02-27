'use client';

import { useState } from 'react';
import axios from 'axios';
import './styles.css'

interface NoteInterval {
    note: string;
    interval: string;
}

interface ScaleResponse {
    name: string;
    notes: NoteInterval[];
    scale: string;
}

const MusicPage = () => {
    const [note, setNote] = useState<string>('C');
    const [scaleType, setScaleType] = useState<'major' | 'minor'>('major');
    const [scale, setScale] = useState<ScaleResponse | null>(null);

    const fetchScale = async (note: string, scaleType: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            if (!apiUrl) {
                console.error('A variável de ambiente NEXT_PUBLIC_API_URL não está definida');
                return;
            }

            const response = await axios.get<ScaleResponse>(`${apiUrl}/scale/${scaleType}?note=${note}`);
            setScale(response.data);
        } catch (error) {
            console.error('Erro ao buscar a escala:', error);
        }
    };

    return (
        <div className="container">
            <h1>Escalas Musicais</h1>
            <div className="controls">
                <div className="select-container">
                    <label htmlFor="note">Escolha a nota: </label>
                    <select
                        id="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="select"
                    >
                        <option value="C">C</option>
                        <option value="Csharp">C#</option>
                        <option value="D">D</option>
                        <option value="Dsharp">D#</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="Fsharp">F#</option>
                        <option value="G">G</option>
                        <option value="Gsharp">G#</option>
                        <option value="A">A</option>
                        <option value="Asharp">A#</option>
                        <option value="B">B</option>
                    </select>
                </div>
                <div className="select-container">
                    <label htmlFor="scale">Escolha a escala: </label>
                    <select
                        id="scale"
                        value={scaleType}
                        onChange={(e) => setScaleType(e.target.value as 'major' | 'minor')}
                        className="select"
                    >
                        <option value="major">Maior</option>
                        <option value="minor">Menor</option>
                    </select>
                </div>
                <button onClick={() => fetchScale(note, scaleType)} className="button">
                    Buscar Escala
                </button>
            </div>

            <div className="results">
                {scale && (
                    <div className="scale-container">
                        <h2>Escala {scale.name}</h2>
                        <div className="scale-info">
                            <div className="scale-notes">
                                <h3>Notas e Intervalos</h3>
                                <ul>
                                    {scale.notes.map((note, index) => (
                                        <li key={index}>
                                            <strong>{note.note}</strong> - {note.interval}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="scale-summary">
                                <h3>Escala Completa</h3>
                                <p>{scale.scale}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicPage;
