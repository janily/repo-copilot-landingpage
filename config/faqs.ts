export const FAQS_EN = [
  {
    title: "What is CodeLoom?",
    content: "CodeLoom is a Chrome extension that uses AI to analyze your code and automatically generate flow charts, helping you better understand code structure and logic flow.",
  },
  {
    title: "Which programming languages are supported?",
    content: "CodeLoom supports major programming languages including JavaScript, Python, Java, C++, and more. We're continuously adding support for additional languages.",
  },
  {
    title: "How does the flow chart generation work?",
    content: "CodeLoom uses advanced AI to analyze your code's structure, control flow, and logic patterns, then automatically generates clear, intuitive flow charts that represent your code's functionality.",
  },
  {
    title: "Can I export the generated flow charts?",
    content: "Yes, you can export flow charts in various formats including SVG, making them perfect for documentation or presentations.",
  },
];

export const FAQS_ZH = [
  {
    title: "CodeLoom 是什么？",
    content: "CodeLoom 是一个 Chrome 扩展程序，使用 AI 分析代码并自动生成流程图，帮助您更好地理解代码结构和逻辑流程。",
  },
  {
    title: "支持哪些编程语言？",
    content: "CodeLoom 支持主流编程语言，包括 JavaScript、Python、Java、C++ 等。我们正在持续增加对更多语言的支持。",
  },
  {
    title: "流程图生成是如何工作的？",
    content: "CodeLoom 使用先进的 AI 技术分析代码结构、控制流程和逻辑模式，然后自动生成清晰、直观的流程图来展示代码的功能。",
  },
  {
    title: "可以导出生成的流程图吗？",
    content: "是的，您可以将流程图导出为 SVG 格式，非常适合用于文档或演示。",
  },
];

export const FAQS_JA = [
  {
    title: "CodeLoom とは何ですか？",
    content: "CodeLoom は、AIを使用してコードを分析し、自動的にフローチャートを生成する Chrome 拡張機能です。コード構造とロジックの流れをより良く理解するのに役立ちます。",
  },
  {
    title: "どのプログラミング言語に対応していますか？",
    content: "CodeLoom は JavaScript、Python、Java、C++ など、主要なプログラミング言語に対応しています。さらに多くの言語のサポートを継続的に追加しています。",
  },
  {
    title: "フローチャートの生成の仕組みを教えてください。",
    content: "CodeLoom は高度なAI技術を使用してコードの構造、制御フロー、ロジックパターンを分析し、コードの機能を表す明確で直感的なフローチャートを自動生成します。",
  },
  {
    title: "生成したフローチャートをエクスポートできますか？",
    content: "はい、フローチャートを SVG 形式でエクスポートできます。ドキュメントやプレゼンテーションに最適です。",
  },
];

export const FAQS_KO = [
  {
    title: "CodeLoom이란 무엇인가요?",
    content: "CodeLoom은 AI를 사용하여 코드를 분석하고 자동으로 순서도를 생성하는 Chrome 확장 프로그램입니다. 코드 구조와 로직 흐름을 더 잘 이해할 수 있도록 도와줍니다.",
  },
  {
    title: "어떤 프로그래밍 언어를 지원하나요?",
    content: "CodeLoom은 JavaScript, Python, Java, C++ 등 주요 프로그래밍 언어를 지원합니다. 더 많은 언어 지원을 지속적으로 추가하고 있습니다.",
  },
  {
    title: "순서도 생성은 어떻게 작동하나요?",
    content: "CodeLoom은 고급 AI 기술을 사용하여 코드 구조, 제어 흐름 및 로직 패턴을 분석한 다음, 코드의 기능을 나타내는 명확하고 직관적인 순서도를 자동으로 생성합니다.",
  },
  {
    title: "생성된 순서도를 내보낼 수 있나요?",
    content: "네, 순서도를 SVG 형식으로 내보낼 수 있어 문서화나 프레젠테이션에 완벽합니다.",
  },
];

export const FAQS_ES = [
  {
    title: "¿Qué es CodeLoom?",
    content: "CodeLoom es una extensión de Chrome que utiliza IA para analizar tu código y generar automáticamente diagramas de flujo, ayudándote a comprender mejor la estructura y el flujo lógico del código.",
  },
  {
    title: "¿Qué lenguajes de programación son compatibles?",
    content: "CodeLoom es compatible con los principales lenguajes de programación, incluyendo JavaScript, Python, Java, C++ y más. Continuamente añadimos soporte para lenguajes adicionales.",
  },
  {
    title: "¿Cómo funciona la generación de diagramas de flujo?",
    content: "CodeLoom utiliza IA avanzada para analizar la estructura del código, el flujo de control y los patrones lógicos, generando automáticamente diagramas de flujo claros e intuitivos que representan la funcionalidad del código.",
  },
  {
    title: "¿Puedo exportar los diagramas de flujo generados?",
    content: "Sí, puedes exportar los diagramas de flujo en formato SVG, haciéndolos perfectos para documentación o presentaciones.",
  },
];

export const FAQS_FR = [
  {
    title: "Qu'est-ce que CodeLoom ?",
    content: "CodeLoom est une extension Chrome qui utilise l'IA pour analyser votre code et générer automatiquement des diagrammes de flux, vous aidant à mieux comprendre la structure et le flux logique du code.",
  },
  {
    title: "Quels langages de programmation sont pris en charge ?",
    content: "CodeLoom prend en charge les principaux langages de programmation, notamment JavaScript, Python, Java, C++ et plus encore. Nous ajoutons continuellement le support pour d'autres langages.",
  },
  {
    title: "Comment fonctionne la génération de diagrammes de flux ?",
    content: "CodeLoom utilise une IA avancée pour analyser la structure du code, le flux de contrôle et les modèles logiques, puis génère automatiquement des diagrammes de flux clairs et intuitifs qui représentent la fonctionnalité du code.",
  },
  {
    title: "Puis-je exporter les diagrammes de flux générés ?",
    content: "Oui, vous pouvez exporter les diagrammes de flux au format SVG, ce qui les rend parfaits pour la documentation ou les présentations.",
  },
];

interface FAQSCollection {
  [key: `FAQS_${string}`]: {
    title: string;
    content: string;
  }[];
}
export const ALL_FAQS: FAQSCollection = {
  FAQS_EN,
  FAQS_ZH,
  FAQS_JA,
  FAQS_KO,
  FAQS_ES,
  FAQS_FR,
}