/**
 * Recommends the authoritative prayer calculation standard & Asr madhab
 * used by local mosques based on detected country and region.
 */

export interface MosqueRecommendation {
  methodId: string;
  methodName: string;
  madhab: 'shafi' | 'hanafi';
  jurisdiction: string;
  mosqueConventionNote: string;
}

export function getRecommendedMosqueStandard(country: string, city?: string): MosqueRecommendation {
  const c = country.toLowerCase().trim();
  const ci = (city || '').toLowerCase().trim();

  // North America
  if (c.includes('united states') || c.includes('usa') || c.includes('canada')) {
    return {
      methodId: 'ISNA',
      methodName: 'ISNA (North America)',
      madhab: 'shafi',
      jurisdiction: 'Islamic Society of North America',
      mosqueConventionNote: 'Standard used across 95%+ of mosques in the US and Canada with 15° Fajr and Isha angles.',
    };
  }

  // Saudi Arabia & Holy Mosques
  if (c.includes('saudi') || ci.includes('makkah') || ci.includes('madinah') || ci.includes('riyadh')) {
    return {
      methodId: 'UmmAlQura',
      methodName: 'Umm Al-Qura (Makkah)',
      madhab: 'shafi',
      jurisdiction: 'Ministry of Islamic Affairs, Saudi Arabia',
      mosqueConventionNote: 'Official calendar of Masjid al-Haram & Masjid an-Nabawi (18.5° Fajr, 90m Isha offset).',
    };
  }

  // United Arab Emirates
  if (c.includes('emirates') || c.includes('uae') || ci.includes('dubai') || ci.includes('abu dhabi')) {
    return {
      methodId: 'Dubai',
      methodName: 'Dubai Religious Affairs (AWQAF)',
      madhab: 'shafi',
      jurisdiction: 'General Authority of Islamic Affairs & Awqaf',
      mosqueConventionNote: 'Calibrated to the exact UAE Awqaf unified azan network.',
    };
  }

  // Qatar
  if (c.includes('qatar') || ci.includes('doha')) {
    return {
      methodId: 'Qatar',
      methodName: 'Qatar Ministry of Awqaf',
      madhab: 'shafi',
      jurisdiction: 'Qatar Ministry of Endowments and Islamic Affairs',
      mosqueConventionNote: 'Matches State of Qatar official mosque schedules.',
    };
  }

  // Kuwait
  if (c.includes('kuwait')) {
    return {
      methodId: 'Kuwait',
      methodName: 'Kuwait Awqaf Standard',
      madhab: 'shafi',
      jurisdiction: 'Ministry of Awqaf & Islamic Affairs Kuwait',
      mosqueConventionNote: 'Used by all State of Kuwait registered masjids.',
    };
  }

  // Egypt and North Africa
  if (c.includes('egypt') || c.includes('cairo') || c.includes('alexandria') || c.includes('libya') || c.includes('sudan') || c.includes('morocco') || c.includes('algeria') || c.includes('tunisia')) {
    return {
      methodId: 'Egyptian',
      methodName: 'Egyptian General Authority of Survey',
      madhab: 'shafi',
      jurisdiction: 'Egyptian Dar al-Ifta / General Authority',
      mosqueConventionNote: 'Authoritative 19.5° Fajr and 17.5° Isha standard used by Al-Azhar and North African masjids.',
    };
  }

  // South Asia (Pakistan, India, Bangladesh, Afghanistan)
  if (c.includes('pakistan') || c.includes('india') || c.includes('bangladesh') || c.includes('afghanistan')) {
    return {
      methodId: 'Karachi',
      methodName: 'University of Islamic Sciences, Karachi',
      madhab: 'hanafi',
      jurisdiction: 'Darul Uloom / Jamia Uloom-ul-Islamia',
      mosqueConventionNote: 'Standard 18°/18° calculation with Hanafi shadow ratio used by majority of South Asian mosques.',
    };
  }

  // Singapore, Malaysia, Indonesia, Brunei
  if (c.includes('singapore')) {
    return {
      methodId: 'Singapore',
      methodName: 'MUIS (Majlis Ugama Islam Singapura)',
      madhab: 'shafi',
      jurisdiction: 'Islamic Religious Council of Singapore',
      mosqueConventionNote: 'Synced with MUIS mosque radio broadcasts and island-wide masjids.',
    };
  }

  if (c.includes('malaysia') || c.includes('indonesia') || c.includes('brunei')) {
    return {
      methodId: 'MWL',
      methodName: 'JAKIM / Muslim World League Standard',
      madhab: 'shafi',
      jurisdiction: 'Department of Islamic Development (JAKIM) / MWL',
      mosqueConventionNote: 'Aligned with Southeast Asian Shafi jurisprudence & regional solar horizons.',
    };
  }

  // East Africa & Horn of Africa (Uganda, Kenya, Tanzania, Somalia, etc.)
  if (c.includes('uganda') || c.includes('kenya') || c.includes('tanzania') || c.includes('somalia') || c.includes('ethiopia') || ci.includes('kampala') || ci.includes('nairobi') || ci.includes('dar es salaam')) {
    return {
      methodId: 'MWL',
      methodName: 'Muslim World League (East African Mosques Standard)',
      madhab: 'shafi',
      jurisdiction: 'Uganda Muslim Supreme Council (UMSC) / Supkem Kenya / MWL',
      mosqueConventionNote: 'Official consensus standard utilized by East African grand mosques (Old Kampala National Mosque, Jamia Mosque Nairobi).',
    };
  }

  // United Kingdom & Western Europe
  if (c.includes('united kingdom') || c.includes('uk') || c.includes('britain') || c.includes('england') || c.includes('scotland') || c.includes('ireland')) {
    return {
      methodId: 'MWL',
      methodName: 'Muslim World League (UK Mosques standard)',
      madhab: 'shafi',
      jurisdiction: 'London Central Mosque / MWL',
      mosqueConventionNote: 'Widely adopted 18° Fajr / 17° Isha standard with high-latitude adjustments.',
    };
  }

  // Default: Muslim World League
  return {
    methodId: 'MWL',
    methodName: 'Muslim World League (Global Standard)',
    madhab: 'shafi',
    jurisdiction: 'Rabitat al-Alam al-Islami (MWL)',
    mosqueConventionNote: 'International consensus standard recognized by majority of world Islamic centers.',
  };
}
