using System;
using System.Runtime.InteropServices;
using System.IO;

namespace WallpaperChanger
{
    class Program
    {
        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        private static extern int SystemParametersInfo(int uAction, int uParam, string lpvParam, int fuWinIni);

        private const int SPI_SETDESKWALLPAPER = 0x0014;
        private const int SPIF_UPDATEINIFILE = 0x01;
        private const int SPIF_SENDWININICHANGE = 0x02;

        static int Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Error: Please provide the absolute path to the image.");
                return 1;
            }

            string imagePath = args[0];

            if (!File.Exists(imagePath))
            {
                Console.WriteLine($"Error: File not found at {imagePath}");
                return 2;
            }

            try
            {
                // Convert to absolute path just in case
                string absolutePath = Path.GetFullPath(imagePath);
                
                int result = SystemParametersInfo(SPI_SETDESKWALLPAPER, 0, absolutePath, SPIF_UPDATEINIFILE | SPIF_SENDWININICHANGE);

                if (result != 0)
                {
                    Console.WriteLine("Success: Wallpaper changed.");
                    return 0;
                }
                else
                {
                    int error = Marshal.GetLastWin32Error();
                    Console.WriteLine($"Error: SystemParametersInfo failed with error code {error}");
                    return 3;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return 4;
            }
        }
    }
}
