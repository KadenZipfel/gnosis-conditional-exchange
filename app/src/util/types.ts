import { BigNumber } from 'ethers/utils'

export enum Status {
  Ready = 'Ready',
  Loading = 'Loading',
  Done = 'Done',
  Error = 'Error',
}

export enum OutcomeSlot {
  Yes = 'Yes',
  No = 'No',
}

export interface BalanceItem {
  outcomeName: OutcomeSlot
  probability: number
  currentPrice: number
  shares: BigNumber
  holdings: BigNumber
  winningOutcome: boolean
}

export enum Stage {
  Running = 0,
  Paused = 1,
  Closed = 2,
}

export enum StatusMarketCreation {
  Ready = 'Ready',
  PostingQuestion = 'Posting question to realitio',
  PrepareCondition = 'Prepare condition',
  ApprovingCollateral = 'Approving collateral',
  CreateMarketMaker = 'Create market maker',
  ApproveCollateralForMarketMaker = 'Approve collateral for market maker',
  AddFunding = 'Add funding in market maker',
  InitialTradeInMarketMaker = 'initial trade in market maker',
  Done = 'Done',
  Error = 'Error',
}

export interface TokenAmountInterface {
  amount: BigNumber
  decimals: number
  format: (precision?: number) => string
  interestRate?: number
  price?: number
  depositBalance?: TokenAmountInterface
  walletBalance?: TokenAmountInterface
}

export enum StepProfile {
  View = 'View',
  Buy = 'Buy',
  Sell = 'Sell',
  CloseMarketDetail = 'CloseMarketDetail',
}

export enum WinnerOutcome {
  Yes = 'Yes',
  No = 'No',
}

export interface Question {
  question: string
  resolution: Maybe<Date>
  arbitratorAddress: string
}

export enum OutcomeTableValue {
  Outcome = 'Outcome',
  Probabilities = 'Probabilities',
  CurrentPrice = 'Current Price',
  Shares = 'Shares',
  Payout = 'Payout',
  PriceAfterTrade = 'Price after trade',
}

export interface Token {
  address: string
  decimals: number
  symbol: string
}

export interface Market {
  marketMakerAddress: string
  ownerAddress: string
  collateralTokenAddress: string
  conditionId: string
}

export enum MarketStatus {
  Open = 'Open',
  Resolved = 'Resolved',
}

export interface MarketValueStatus {
  marketStatus: MarketStatus
}

export type MarketAndQuestion = Market & MarketValueStatus & Question

export interface Log {
  topics: Array<string>
  data: string
}

export enum MarketFilters {
  AllMarkets = 'All Markets',
  MyMarkets = 'My Markets',
}

export interface Arbitrator {
  address: string
  name: string
  url: string
}
