import { RankingEntry } from '@/lib/mock-data';

interface RankingListProps {
  rankings: RankingEntry[];
  currentUserId?: string;
}

export function RankingList({ rankings, currentUserId }: RankingListProps) {
  return (
    <div className="space-y-3">
      {rankings.map((entry) => {
        const isTopThree = entry.position <= 3;
        const isCurrentUser = entry.user.id === currentUserId;
        
        return (
          <div
            key={entry.user.id}
            className={`
              rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 transition-all
              ${isTopThree ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-800/30' : 'bg-gray-900'}
              ${isCurrentUser ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            {/* Position */}
            <div className={`
              w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-lg sm:text-xl
              ${isTopThree ? 'bg-gradient-to-br from-yellow-600 to-orange-600 text-black' : 'bg-gray-800 text-white'}
            `}>
              {entry.position}°
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-medium">
                {entry.user.name}
                {isCurrentUser && <span className="text-blue-500 ml-1 sm:ml-2 text-sm sm:text-base">(Você)</span>}
              </h3>
            </div>

            {/* Drops Count */}
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-bold">{entry.totalDrops}</p>
              <p className="text-xs sm:text-sm text-gray-400">gotas</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}