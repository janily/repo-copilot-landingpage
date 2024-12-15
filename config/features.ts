import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export const FEATURES_EN = [
  {
    title: "AI Code Analysis",
    content: "Instantly analyze code structure with advanced AI technology",
    icon: '🔍',
  },
  {
    title: "Flow Chart Generation",
    content: "Generate clear, intuitive flow charts from your code automatically",
    icon: '📊',
  },
  {
    title: "Multiple Languages Support",
    content: "Support for major programming languages and frameworks",
    icon: '🌐',
  },
  {
    title: "Clean Interface",
    content: "Intuitive design for seamless code visualization experience",
    icon: '🎨',
  },
  {
    title: "Easy Integration",
    content: "Seamlessly integrates with your development workflow",
    icon: '🔄',
  },
  {
    title: "Export Options",
    content: "Export flow charts in SVG format for documentation",
    icon: '💾',
  },
]; 

interface FeaturesCollection {
    [key: `FEATURES_${string}`]: {
      title: string;
      content: string;
      icon: IconType | LucideIcon | string;
    }[];
  }


export const FEATURES_ZH = [
  {
    title: "AI 代码分析",
    content: "使用先进的 AI 技术即时分析代码结构",
    icon: '🔍',
  },
  {
    title: "流程图生成",
    content: "自动生成清晰、直观的代码流程图",
    icon: '📊',
  },
  {
    title: "多语言支持",
    content: "支持主流编程语言和框架",
    icon: '🌐',
  },
  {
    title: "简洁界面",
    content: "直观的设计带来流畅的代码可视化体验",
    icon: '🎨',
  },
  {
    title: "便捷集成",
    content: "无缝融入您的开发工作流程",
    icon: '🔄',
  },
  {
    title: "导出选项",
    content: "支持多种格式导出流程图用于文档",
    icon: '💾',
  },
];

export const FEATURES_JA = [
  {
    title: "AI コード分析",
    content: "最先端のAI技術でコード構造を瞬時に分析",
    icon: '🔍',
  },
  {
    title: "フローチャート生成",
    content: "明確で直感的なフローチャートを自動生成",
    icon: '📊',
  },
  {
    title: "複数言語対応",
    content: "主要なプログラミング言語とフレームワークをサポート",
    icon: '🌐',
  },
  {
    title: "クリーンな界面",
    content: "シームレスなコード可視化体験のための直感的なデザイン",
    icon: '🎨',
  },
  {
    title: "簡単な統合",
    content: "開発ワークフローにシームレスに統合",
    icon: '🔄',
  },
  {
    title: "エクスポート機能",
    content: "ドキュメント用に様々な形式でフローチャートを出力可能",
    icon: '💾',
  },
];

export const FEATURES_KO = [
  {
    title: "AI 코드 분석",
    content: "첨단 AI 기술로 코드 구조를 즉시 분석",
    icon: '🔍',
  },
  {
    title: "순서도 생성",
    content: "명확하고 직관적인 순서도를 자동으로 생성",
    icon: '📊',
  },
  {
    title: "다중 언어 지원",
    content: "주요 프로그래밍 언어 및 프레임워크 지원",
    icon: '🌐',
  },
  {
    title: "깔끔한 인터페이스",
    content: "원활한 코드 시각화 경험을 위한 직관적인 디자인",
    icon: '🎨',
  },
  {
    title: "손쉬운 통합",
    content: "개발 워크플로우에 완벽하게 통합",
    icon: '🔄',
  },
  {
    title: "내보내기 옵션",
    content: "문서화를 위한 다양한 형식의 순서도 내보내기",
    icon: '💾',
  },
];

export const FEATURES_ES = [
  {
    title: "Análisis de Código con IA",
    content: "Analiza instantáneamente la estructura del código con tecnología AI avanzada",
    icon: '🔍',
  },
  {
    title: "Generación de Diagramas",
    content: "Genera diagramas de flujo claros e intuitivos automáticamente",
    icon: '📊',
  },
  {
    title: "Soporte Multilenguaje",
    content: "Compatible con los principales lenguajes de programación y frameworks",
    icon: '🌐',
  },
  {
    title: "Interfaz Limpia",
    content: "Diseño intuitivo para una experiencia fluida de visualización de código",
    icon: '🎨',
  },
  {
    title: "Fácil Integración",
    content: "Se integra perfectamente en tu flujo de trabajo de desarrollo",
    icon: '🔄',
  },
  {
    title: "Opciones de Exportación",
    content: "Exporta diagramas de flujo en varios formatos para documentación",
    icon: '💾',
  },
];

export const FEATURES_FR = [
  {
    title: "Analyse de Code par IA",
    content: "Analysez instantanément la structure du code avec une technologie IA avancée",
    icon: '🔍',
  },
  {
    title: "Génération de Diagrammes",
    content: "Générez automatiquement des diagrammes de flux clairs et intuitifs",
    icon: '📊',
  },
  {
    title: "Support Multilingue",
    content: "Prise en charge des principaux langages de programmation et frameworks",
    icon: '🌐',
  },
  {
    title: "Interface Épurée",
    content: "Design intuitif pour une expérience fluide de visualisation du code",
    icon: '🎨',
  },
  {
    title: "Intégration Facile",
    content: "S'intègre parfaitement dans votre flux de travail de développement",
    icon: '🔄',
  },
  {
    title: "Options d'Exportation",
    content: "Exportez les diagrammes dans divers formats pour la documentation",
    icon: '💾',
  },
];

export const ALL_FEATURES: FeaturesCollection = {
    FEATURES_EN,
    FEATURES_ZH,
    FEATURES_JA,
    FEATURES_KO,
    FEATURES_ES,
    FEATURES_FR
}