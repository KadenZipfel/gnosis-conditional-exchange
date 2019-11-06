import { useEffect, useState } from 'react'

import { ConnectedWeb3Context } from './connectedWeb3'
import { useContracts } from './useContracts'
import { getLogger } from '../util/logger'
import { Market, MarketAndQuestion, MarketStatus, Status } from '../util/types'
import { DisconnectedWeb3Context } from './disconnectedWeb3'

const logger = getLogger('Market::useMarkets')

export const useMarkets = (
  context: ConnectedWeb3Context | DisconnectedWeb3Context,
): {
  markets: MarketAndQuestion[]
  status: Status
} => {
  const { marketMakerFactory, conditionalTokens, realitio } = useContracts(context)

  const [status, setStatus] = useState<Status>(Status.Ready)
  const [markets, setMarkets] = useState<MarketAndQuestion[]>([])

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setStatus(Status.Loading)
        const provider = context.library

        const getQuestionData = async (market: Market) => {
          const { conditionId } = market
          // Get question data
          const questionId = await conditionalTokens.getQuestionId(conditionId)
          const { question, resolution } = await realitio.getQuestion(questionId)
          // Know if a market is open or resolved
          const isConditionResolved = await conditionalTokens.isConditionResolved(conditionId)
          const marketStatus = isConditionResolved ? MarketStatus.Resolved : MarketStatus.Open
          return {
            ...market,
            question,
            resolution,
            marketStatus,
          }
        }

        const markets = await marketMakerFactory.getMarkets(provider)
        const marketsWithRealitioData = await Promise.all(
          markets.map((market: Market) => getQuestionData(market)),
        )

        setMarkets(marketsWithRealitioData)
        setStatus(Status.Done)
      } catch (error) {
        logger.error('There was an error fetching the markets data:', error.message)
        setStatus(Status.Error)
      }
    }

    fetchMarkets()
  }, [context, marketMakerFactory, conditionalTokens, realitio])

  return {
    markets,
    status,
  }
}
