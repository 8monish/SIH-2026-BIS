export interface QuickPrompt {
  id: string;
  category: string;
  label: string;
  query: string;
  iconName: string;
}

export const SAMPLE_QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'p-water',
    category: 'Food & Safety',
    label: 'Packaged Drinking Water (ISI)',
    query: 'What are the mandatory BIS requirements and testing parameters to set up a packaged drinking water plant in India?',
    iconName: 'Droplets'
  },
  {
    id: 'p-battery',
    category: 'Electronics',
    label: 'EV Lithium-Ion Battery (CRS)',
    query: 'Which standard applies to Lithium-ion battery packs for electric vehicles and what are the required safety tests under CRS?',
    iconName: 'BatteryCharging'
  },
  {
    id: 'p-helmet',
    category: 'Automotive',
    label: 'Two-Wheeler Helmets (IS 4151)',
    query: 'Is ISI certification mandatory for two-wheeler helmets? What are the key impact tests and penalty for non-compliance?',
    iconName: 'ShieldAlert'
  },
  {
    id: 'p-hallmark',
    category: 'Hallmarking',
    label: 'Gold Jewellery 6-Digit HUID',
    query: 'How does the mandatory 6-digit HUID hallmarking process work for retail jewellers and what are the assaying charges?',
    iconName: 'Gem'
  },
  {
    id: 'p-toys',
    category: 'Consumer Goods',
    label: 'Toys Quality Control Order',
    query: 'What are the QCO requirements for manufacturing or importing children toys under IS 9873?',
    iconName: 'Gamepad2'
  },
  {
    id: 'p-msme',
    category: 'MSME Benefits',
    label: 'MSME Fee Concessions & Subsidies',
    query: 'Are there any fee concessions or subsidies available for MSMEs and women entrepreneurs when applying for BIS ISI certification?',
    iconName: 'Percent'
  }
];
