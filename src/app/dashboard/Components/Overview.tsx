import { useUser } from "@/Hooks/UseUser";
import { Wallet, Star, Coins, User, User2 } from "lucide-react";

export default function Overview() {
  const { user } = useUser();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.username} 👋
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Here's an overview of your crypto account.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Total Assets */}

        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Assets</p>

              <h3 className="text-2xl font-bold mt-2">
                {user?.balances?.length ?? 0} Coins
              </h3>
            </div>

            <div className="p-3 bg-blue-100 rounded-xl">
              <Coins className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Watchlist */}

        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Watchlist</p>

              <h3 className="text-2xl font-bold mt-2">
                {user?.watchlist?.length ?? 0} Coins
              </h3>
            </div>

            <div className="p-3 bg-yellow-100 rounded-xl">
              <Star className="text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Wallet Balance */}

        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Wallet Balance</p>

              <h3 className="text-2xl font-bold mt-2">
                ${user?.usdBalance?.toFixed(2) ?? "0.00"}
              </h3>
            </div>

            <div className="p-3 bg-green-100 rounded-xl">
              <Wallet className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Profile */}

        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Profile</p>

              <div className="mt-4 space-y-2">
                <p className="font-bold text-lg">{user?.username}</p>

                <p className="text-sm text-gray-500">{user?.email}</p>

                {user?.createdAt && (
                  <p className=" text-gray-500">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 bg-purple-100 rounded-xl h-fit">
              <User className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* Wallet Address */}

        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Wallet Address</p>

              <h3 className="text-lg font-bold mt-3">
                {user?.walletAddress
                  ? `${user.walletAddress.slice(0, 8)}...${user.walletAddress.slice(-6)}`
                  : "No Address"}
              </h3>
            </div>

            <div className="p-3 bg-green-100 rounded-xl">
              <Wallet className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Account Status */}

        <div className="rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Account Status</p>

              <div className="mt-3">
                <span
                  className="
                px-4 py-2 rounded-full
                bg-blue-100 text-blue-700
                text-sm font-semibold
                "
                >
                  {user?.role ?? "user"}
                </span>
              </div>
            </div>

            <div className="p-3 bg-blue-100 rounded-xl">
              <User2 className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Assets Details */}

        <div
          className="
        col-span-full
        rounded-2xl 
        bg-white 
        dark:bg-gray-900 
        p-6 
        shadow-lg 
        border 
        border-gray-200 
        dark:border-gray-800
        "
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-500">Your Assets</p>

              <h3 className="text-2xl font-bold mt-2">
                {user?.balances?.length ?? 0} Coins
              </h3>
            </div>

            <div className="p-3 bg-green-100 rounded-xl">
              <Coins className="text-green-600" />
            </div>
          </div>

          <div className="space-y-3">
            {user?.balances?.slice(0, 5).map((asset) => (
              <div
                key={asset.symbol}
                className="
                flex justify-between items-center
                bg-gray-50 
                dark:bg-gray-800
                rounded-xl 
                p-4
                "
              >
                <span className="font-bold">{asset.symbol}</span>

                <span className="text-gray-600 dark:text-gray-300">
                  {asset.amount}
                </span>
              </div>
            ))}

            {!user?.balances?.length && (
              <p className="text-gray-500 text-center">No assets found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
