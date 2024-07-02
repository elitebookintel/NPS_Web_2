using System.Collections.Concurrent;

namespace Application.Service.Token
{
    public static class AsyncSessionHelper
    {
        private static readonly ConcurrentDictionary<string, Guid_CookieLock> Guid_CookieLocks = new ConcurrentDictionary<string, Guid_CookieLock>();
        private static readonly SemaphoreSlim CleanupSemaphore = new SemaphoreSlim(1, 1);
        private static DateTime lastCleanup = DateTime.Now;

        private static Guid_CookieLock GetTokenLock(string Guid_Cookie)
        {
            return Guid_CookieLocks.GetOrAdd(Guid_Cookie, _ => new Guid_CookieLock());
        }

        public static async Task Set_Token_Async(string Guid_Cookie, string token)
        {
            await CleanupSemaphore.WaitAsync();
            CleanupSemaphore.Release();

            var Guid_CookieLock = GetTokenLock(Guid_Cookie);
            var now = DateTime.Now;
            await Guid_CookieLock.SemaphoreSlim.WaitAsync();
            try
            {
                Guid_CookieLock.LastAccessed = now;
                Guid_CookieLock.Token = Uri.EscapeDataString(token);
                if (Guid_CookieLocks.Count > 1000 && (now - lastCleanup > TimeSpan.FromMinutes(20)))
                {
                    await CleanupOldSessionsAsync(now);
                }
            }
            finally
            {
                Guid_CookieLock.SemaphoreSlim.Release();
            }
        }
        public static async Task<Guid_CookieLock> Get_Token_Async(string Guid_Cookie)
        {
            await CleanupSemaphore.WaitAsync();
            CleanupSemaphore.Release();

            var Guid_CookieLock = GetTokenLock(Guid_Cookie);
            if (Guid_CookieLock!= null)
            {
                var now = DateTime.Now;
                if (Guid_CookieLocks.Count > 1000 && (now - lastCleanup > TimeSpan.FromMinutes(20)))
                {
                    await CleanupOldSessionsAsync(now);
                }
                await Guid_CookieLock.SemaphoreSlim.WaitAsync();
                try
                {
                    Guid_CookieLock.LastAccessed = now;
                    return Guid_CookieLock;
                }
                finally
                {
                    Guid_CookieLock.SemaphoreSlim.Release();
                }
            }
            else
            {
                return Guid_CookieLock;
            }
        }
        private static async Task CleanupOldSessionsAsync(DateTime now)
        {
            if (!await CleanupSemaphore.WaitAsync(0))
            {
                return;
            }
            try
            {
                foreach (var Guid_CookieItem in Guid_CookieLocks.ToArray())
                {
                    if (now - Guid_CookieItem.Value.LastAccessed > TimeSpan.FromMinutes(41))
                    {
                        var cookieLock = Guid_CookieItem.Value;
                        if (await cookieLock.SemaphoreSlim.WaitAsync(0))
                        {
                            try
                            {
                                Guid_CookieLocks.TryRemove(Guid_CookieItem.Key, out _);
                            }
                            finally
                            {
                                cookieLock.SemaphoreSlim.Release();
                            }
                        }
                    }
                }
                lastCleanup = now;
            }
            finally
            {
                CleanupSemaphore.Release();
            }
        }
        //private static string CreateMD5(string input)
        //{
        //    using (MD5 md5 = MD5.Create())
        //    {
        //        byte[] inputBytes = Encoding.ASCII.GetBytes(input);
        //        byte[] hashBytes = md5.ComputeHash(inputBytes);
        //        return Convert.ToHexString(hashBytes);
        //    }
        //}
    }

    public class Guid_CookieLock
    {
        public DateTime LastAccessed { get; set; } = DateTime.Now;
        public SemaphoreSlim SemaphoreSlim { get; set; } = new SemaphoreSlim(1, 1);
        public string Token { get; set; }
    }
}
