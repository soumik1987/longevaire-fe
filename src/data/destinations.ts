export interface Destination {
  country: string;
  cities: string[];
  image: string;
}

export const destinations: Destination[] = [
  {
    country: "USA",
    cities: ["Tucson", "Lenox", "Sedona", "Palm Springs", "Aspen", "Malibu"],
    image: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    country: "Italy",
    cities: ["Florence", "Venice", "Rome", "Milan", "Sorrento", "Amalfi"],
    image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    country: "Switzerland",
    cities: ["Zurich", "Lucerne", "Geneva", "Lugano", "St. Moritz"],
    image: "https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    country: "Bali",
    cities: ["Ubud", "Seminyak", "Nusa Dua", "Canggu", "Sanur", "Jimbaran", "Amed"],
    image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    country: "Thailand",
    cities: ["Bangkok", "Chiang Mai", "Phuket", "Krabi", "Koh Samui", "Hua Hin", "Pai"],
    image: "https://images.pexels.com/photos/1007657/pexels-photo-1007657.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    country: "Greece",
    cities: ["Santorini", "Mykonos", "Athens", "Crete", "Rhodes", "Corfu", "Thessaloniki"],
    image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    country: "Japan",
    cities: ["Tokyo", "Kyoto", "Osaka", "Nara", "Hakone", "Nikko"],
    image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1200"
  },
  {
    country: "Germany",
    cities: ["Baden-Baden", "Munich", "Berlin", "Hamburg", "Frankfurt"],
    image: "https://images.pexels.com/photos/1119972/pexels-photo-1119972.jpeg"
  },
  {
    country: "Costa Rica",
    cities: ["Manuel Antonio", "San José", "Tamarindo", "Monteverde", "Puerto Viejo"],
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1200"
  }
];