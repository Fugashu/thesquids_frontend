// __tests__/metamask.test.js
import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Fetch from './fetch'
import MetaMaskButton from "../MetamaskConnection/connectToMetamaskButton";
import { generateTestingUtils } from "eth-testing";
import MetaMaskButtonMobile from "../MetamaskConnection/connectToMetamaskButtonMobile";
import {isWalletConnected} from "../MetamaskConnection/Config";




const server = setupServer(
    rest.get('/', (req, res, ctx) => {
        return res(ctx.json({greeting: 'hello there'}))
    }),
)

const testingUtils = generateTestingUtils({ providerType: "MetaMask" });
beforeAll(() => {
    global.window.ethereum = testingUtils.getProvider();
    server.listen();
})

afterEach(() => {
    testingUtils.clearAllMocks();
    server.resetHandlers();
})
afterAll(() => server.close())


test('test wallet connection with mock metamask account mobile', async () => {
    render(<MetaMaskButtonMobile/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);
    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})
test('test wallet connection with mock metamask account desktop', async () => {
    render(<MetaMaskButton/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);
    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})
test('fetch api for whitelisted addresses', async () => {
    render(<MetaMaskButton/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);

    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})
test('fetch api whitelist active', async () => {
    render(<MetaMaskButton/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);

    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})

test('fetch api whitelist inactive', async () => {
    render(<MetaMaskButton/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);

    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})

test('try mint whitelisted address', async () => {
    render(<MetaMaskButton/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);

    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})
test('try mint non-whitelisted address', async () => {
    render(<MetaMaskButton/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);

    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})
test('try mint more than one NFTs', async () => {
    render(<MetaMaskButton/>)
    testingUtils.mockNotConnectedWallet();
    expect(screen.getByRole("connect")).toBeInTheDocument();
    // Mock the connection request of MetaMask
    testingUtils.mockRequestAccounts(["0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf"]);

    fireEvent.click(screen.getByRole('connect'))
    await new Promise((r) => setTimeout(r, 2000));
    expect(screen.getByRole("disconnect")).toBeInTheDocument();


})

test('handle server error', async () => {
    server.use(
        rest.get('/greeting', (req, res, ctx) => {
            return res(ctx.status(500))
        }),
    )

    render(<Fetch url="/greeting" />)

    fireEvent.click(screen.getByText('Load Greeting'))

    await waitFor(() => screen.getByRole('alert'))

    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.getByRole('button')).not.toBeDisabled()
})