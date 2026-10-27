import {
  Ambulance, BookOpen, Bus, CarTaxiFront, Cigarette, Circle, Clock, Coffee, Ellipsis, Eye, Bandage, Globe, Hand, Info, Mail,
  MapPin, Medal, MessageSquareText, Pill, Pointer, Scissors, Share, Siren, Smartphone, SquarePlus, Store, Tablets,
  Thermometer, TrainFront, TriangleAlert, UserRound, Utensils, Volume2, X, type LucideProps,
} from 'lucide-react';

// サイト共通のアイコン（lucide の線画アイコン）。絵文字は使わない（2026-10-27 ユーザー「絵文字はダサい」・外部の UI 評価）。
// Astro のページからも React の島からも <Icon name="bus" /> で使う。データ（src/data/）には名前だけ書く。
const icons = {
  ambulance: Ambulance, book: BookOpen, bus: Bus, taxi: CarTaxiFront, cigarette: Cigarette, circle: Circle, clock: Clock,
  coffee: Coffee, ellipsis: Ellipsis, eye: Eye, bandage: Bandage, globe: Globe, hand: Hand, info: Info, mail: Mail, pin: MapPin, medal: Medal,
  pharmacist: MessageSquareText, pill: Pill, pointer: Pointer, scissors: Scissors, share: Share, siren: Siren,
  phone: Smartphone, 'add-home': SquarePlus, shop: Store, tablets: Tablets, thermometer: Thermometer, train: TrainFront,
  alert: TriangleAlert, person: UserRound, utensils: Utensils, speaker: Volume2, x: X,
};

export type IconName = keyof typeof icons;

export function Icon({ name, size = 20, ...rest }: { name: IconName } & LucideProps) {
  const C = icons[name];
  return <C size={size} aria-hidden="true" {...rest} />;
}
