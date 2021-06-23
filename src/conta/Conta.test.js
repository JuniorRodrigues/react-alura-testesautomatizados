import React from 'react';
import { render, screen } from '@testing-library/react';
import Conta from './Conta';

describe ('Componente de conta', () => {
    it ('Exibe o saldo da conta como valor monetário', () => {
        render(<Conta saldo={1000} />);

        const saldo = screen.getByTestId('saldo-conta');

        expect(saldo.textContent).toBe('R$ 1000');
    });

    if('Chama realizar transacao ao clicar no botao', () => {
        const funcaoRealizarTransacao = jest.fn();

        render(<Conta saldo={1000} realizarTransacao={ funcaoRealizarTransacao } />);
        fireEvent.click(screen.getByText('Realizar operação'));
        expect(funcaoRealizarTransacao).toHaveBeenCalled();
    });
});
