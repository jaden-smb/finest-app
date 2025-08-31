export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'debt';
  amount: number;
  description: string;
  category: string;
  tags: string[];
  notes?: string;
  date: Date;
  isRecurring?: boolean;
  recurringPeriod?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense' | 'debt';
}

export interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: string;
  isCompleted: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: Date;
  isUnlocked: boolean;
  category: 'savings' | 'debt' | 'streak' | 'education' | 'milestone';
}

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  totalXp: number;
  streak: number;
  avatarConfig: AvatarConfig;
  joinedAt: Date;
}

export interface AvatarConfig {
  head: string;
  body: string;
  accessories: string[];
  background: string;
}

export interface CreditScore {
  score: number;
  range: 'poor' | 'fair' | 'good' | 'very-good' | 'excellent';
  factors: CreditFactor[];
  lastUpdated: Date;
  trend: 'improving' | 'stable' | 'declining';
}

export interface CreditFactor {
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
  weight: number;
}

export interface FinancialInsight {
  id: string;
  type: 'spending-pattern' | 'saving-opportunity' | 'debt-warning' | 'investment-suggestion';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  action?: string;
  dateGenerated: Date;
}

export interface Notification {
  id: string;
  type: 'budget-warning' | 'ant-expense' | 'goal-reminder' | 'achievement' | 'insight';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionRequired?: boolean;
  actionUrl?: string;
}

export interface EducationContent {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'quiz' | 'interactive';
  duration: number; // in minutes
  xpReward: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  completedAt?: Date;
  category: string;
  thumbnail?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    colors?: (opacity?: number) => string[];
  }[];
}

export interface DashboardData {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalDebt: number;
  savingsRate: number;
  recentTransactions: Transaction[];
  upcomingBills: Transaction[];
  budgetStatus: Budget[];
  insights: FinancialInsight[];
}

export type NavigationParams = {
  Main: undefined;
  Home: undefined;
  Transactions: undefined;
  AddTransaction: { type?: 'income' | 'expense' | 'debt' };
  Budget: undefined;
  Goals: undefined;
  Insights: undefined;
  Education: undefined;
  Profile: undefined;
  Settings: undefined;
  CreditScore: undefined;
  Achievements: undefined;
};
