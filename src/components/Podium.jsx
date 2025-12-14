import React, { useEffect, useRef } from 'react'
import PodiumSlot from './PodiumSlot'
import { usePodiumAnimation } from '../hooks/useAnimations'

/**
 * Podium Component
 * 
 * Displays the top-3 participants in a visually dominant podium layout.
 * This section represents success, competition, and achievement.
 * 
 * Layout:
 * - Rank 2 (Silver, Left)
 * - Rank 1 (Gold, Center, Tallest)
 * - Rank 3 (Bronze, Right)
 * 
 * Future Integration:
 * - Will receive real data from scoring service
 * - Will trigger animations on data updates
 * - Will play celebration sounds when leader changes
 */
import LeaderBadge from './LeaderBadge'

function Podium({ podiumData, leader }) {
  const podiumRef = useRef(null)
  const { triggerPodiumEntry } = usePodiumAnimation()

  useEffect(() => {
    // Trigger podium entry animation on mount
    if (podiumRef.current) {
      triggerPodiumEntry(podiumRef.current)
    }
  }, [triggerPodiumEntry])

  // Ensure we have exactly 3 participants
  const topThree = podiumData.slice(0, 3)
  const rankOne = topThree.find(p => p.rank === 1)

  return (
    <section className="podium-section" ref={podiumRef}>
      <div className="podium-container">
        {topThree.map((participant) => (
          <PodiumSlot
            key={participant.rank}
            rank={participant.rank}
            username={participant.username}
            coins={participant.coins}
          >
            {participant.rank === 1 && rankOne && (
              <LeaderBadge leader={rankOne} />
            )}
          </PodiumSlot>
        ))}
      </div>
    </section>
  )
}

export default Podium

