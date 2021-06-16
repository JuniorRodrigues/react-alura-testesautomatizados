import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('Componente principal', () => {
    describe ('▶️  Ao abrir o App', () => {
        describe ('👁️  É exibido:', () => {
            it ('Nome do banco', () => {
                render(<App />);

                expect(screen.getByText('ByteBank')).toBeInTheDocument();
            })

            it ('Saldo', () => {
                render(<App />);

                expect(screen.getByText('Saldo:')).toBeInTheDocument();
            });

            it ('Botão Realizar operação', () => {
                render(<App />);

                expect(screen.getByText('Realizar operação')).toBeInTheDocument();
            });
        });
    });
});
