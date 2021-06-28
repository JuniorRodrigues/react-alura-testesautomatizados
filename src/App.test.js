import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import App, { calcularNovoSaldo } from './App';

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

    describe ('Ao realizar uma transação', () => {
        const saldoAnterior = 150;

        it ('💸  se saque o valor diminui', () => {
            const saque = 50;

            const operacao = {
                transacao: 'saque',
                valor: saque
            }

            const novoSaldo = calcularNovoSaldo(operacao, saldoAnterior);

            expect(novoSaldo).toBe(100);
        });

        it ('🤑  se deposito o valor aumenta', () => {
            const deposito = 50;

            const operacao = {
                transacao: 'deposito',
                valor: deposito
            }

            const novoSaldo = calcularNovoSaldo(operacao, saldoAnterior);

            expect(novoSaldo).toBe(200);
        });

        it ('💳  ao sacar um valor que não tenho na conta', () => {
            const saque = 200;

            const operacao = {
                transacao: 'saque',
                valor: saque
            }

            const novoSaldo = calcularNovoSaldo(operacao, saldoAnterior);

            expect(novoSaldo).toBeLessThan(0)
        });

        it ('🧧  ao zerar o saldo', () => {
            const saque = 150;

            const operacao = {
                transacao: 'saque',
                valor: saque
            }

            const novoSaldo = calcularNovoSaldo(operacao, saldoAnterior);

            expect(novoSaldo).toBe(0)
        });

        it('saque: a transação deve ser realizada', () => {
            const {
                getByText,
                getByTestId,
                getByLabelText
            } = render(<App />);

            const saldo             = getByText('R$ 1000');
            const transacao         = getByLabelText('Saque');
            const valor             = getByTestId('valor');
            const botaoTransacao    = getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');
            fireEvent.click(transacao, { target: { value: 'saque' }});
            fireEvent.change(valor, { target: { value: 10 }});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        });

        it('deposito: a transação deve ser realizada', () => {
            render(<App />);

            const saldo             = screen.getByText('R$ 1000');
            const transacao         = screen.getByLabelText('Depósito');
            const valor             = screen.getByTestId('valor');
            const botaoTransacao    = screen.getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');
            fireEvent.click(transacao, { target: { value: 'deposito' }});
            fireEvent.change(valor, { target: { value: 10 }});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 1010');
        });
    });

    function calculoQuadrado (numero) {
        return Math.pow(numero, 2);
    }

    it ('calcula valor quadrado de um número', () => {
        const resultado = calculoQuadrado(2);
        const resultadoB = calculoQuadrado(4);

        expect(resultado).toBe(4);
        expect(resultadoB).toBe(16);
    });
});
