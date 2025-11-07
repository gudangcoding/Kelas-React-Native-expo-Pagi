# Materi Kursus React Native Expo — Kelas Coding Advance (LKP Naura)

Repository ini berisi materi dan contoh aplikasi untuk kelas Coding Advance menggunakan React Native (Expo) di LKP Naura. Materi difokuskan pada pembuatan UI modern, navigasi file-based (`expo-router`), dan fitur e-commerce dasar yang dapat dikembangkan lebih lanjut.

Website LKP Naura: https://lkpnaura.com

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## Tangkapan Layar
Berikut beberapa tampilan utama aplikasi (gambar ada di folder `skrinsut/`):

![Login](skrinsut/login.png)
![Register](skrinsut/register.png)
![Dashboard/Home](skrinsut/dashboard.png)
![Profil](skrinsut/profil.png)
![Edit Profil](skrinsut/edit%20profile.png)
![Wishlist](skrinsut/whislist.png)
![Produk Detail](skrinsut/Produk%20Detail.png)

## Teknologi yang Digunakan
- React Native `0.81.5` (via Expo SDK `~54`)
- React `19.1.0`
- Expo Router `~6.0.14` (file-based routing & tabs)
- React Navigation Bottom Tabs `^7.4.0`
- Reanimated `~4.1.1`
- Gesture Handler `~2.28.0`
- Safe Area Context `~5.6.0`
- Screens `~4.16.0`
- React Native Web `~0.21.0`
- @expo/vector-icons `^15.0.3`
- Expo Image `~3.0.10`
- Expo Linear Gradient `^15.0.7`
- Expo Blur `^15.0.7`
- Expo Constants `~18.0.10`
- Expo Font `~14.0.9`
- Expo Haptics `~15.0.7`
- Expo Linking `~8.0.8`
- Expo Splash Screen `~31.0.10`
- Expo Status Bar `~3.0.8`
- Expo Symbols `~1.0.7`
- Expo System UI `~6.0.8`
- Expo Web Browser `~15.0.9`

### Dev Dependencies
- TypeScript `~5.9.2`
- ESLint `^9.25.0` dengan `eslint-config-expo ~10.0.0`
- @types/react `~19.1.0`

## Fitur Utama (Saat Ini)
- Halaman Login dan Register (UI dasar)
- Beranda (Home) dengan pencarian, chip kategori, dan kartu produk
- Profil bergaya dashboard: metrik riwayat belanja, bonus, status pengiriman, serta ringkasan Cart/Wishlist
- Edit Profil: modal ganti foto (kamera/galeri placeholder), form Nama/Email/Password/No HP/Provinsi/Kota/Alamat
- Wishlist, Cart, Payment, Product Detail dengan layout konsisten
- Navigasi dengan `expo-router` dan bottom tabs

## Struktur Proyek (Ringkas)
- `app/` — layar dan routing berbasis file (`expo-router`)
  - `(tabs)/` — grup layar tab (`index`, `profile`, `search`)
  - `login.tsx`, `register.tsx`, `editProfile.tsx`, `cart.tsx`, `favorite.tsx`, `payment.tsx`, `productDetail.tsx`
- `components/` — komponen UI reusable (Input, Button, Product Card, Chip Scroll, Avatar)
- `assets/images/` — aset gambar
- `app/constants/` — warna dan util responsif

## Cara Menjalankan
1. Install dependencies
   ```bash
   npm install
   ```
2. Jalankan aplikasi (pilih platform)
   ```bash
   npx expo start
   # atau
   npm run web
   npm run android
   npm run ios
   ```

## Improvisasi & Rencana Pengembangan
- Ganti Foto: integrasikan `expo-image-picker` (dan opsional `expo-camera`) agar modal Kamera/Galeri berfungsi penuh.
- Provinsi/Kota: integrasi API RajaOngkir (gunakan env `EXPO_PUBLIC_RAJAONGKIR_API_KEY`) dan dropdown cascade.
- State Management: tambahkan `Zustand` atau `Redux Toolkit` untuk data global (cart/wishlist/profile).
- Penyimpanan Aman: gunakan `expo-secure-store` untuk token login; atau `@react-native-async-storage/async-storage` untuk data non-sensitif.
- Theming: dukung Dark Mode dan tema kustom.
- Testing: setup `jest` dan `@testing-library/react-native` untuk komponen & navigasi.
- i18n: dukung multi-bahasa dengan `react-intl` atau `i18next`.
- Build & Deploy: pertimbangkan EAS (Expo Application Services) untuk build produksi.

## Catatan Tambahan
- Versi Node yang direkomendasikan: `>= 18`.
- Alias path `@/*` sudah diatur di `tsconfig.json`.
- Entri utama Expo: `expo-router/entry` (lihat `package.json`).
