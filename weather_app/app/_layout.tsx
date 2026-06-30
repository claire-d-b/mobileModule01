import { Stack } from "expo-router";

// Stack = Composant de navigation en pile (stack navigator)
// <Stack /> = Enregistre tous les fichiers du dossier app/ comme des écrans empilables
// RootLayoutComposant racine qui orchestre la navigation globale
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
