# Codigo do tipos de dados.tsx

```typescript
export interface Topic {
  id: string;
  title: string;
  completed: boolean;
}

export interface Block {
  id: string;
  name: string; // Ex: "BLOCO 1"
  topics: Topic[];
}

export interface Submodule {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Module {
  id: string;
  title: string;
  submodules: Submodule[];
}

export interface Certification {
  id: string;
  code: string; // Ex: "AZ-900"
  title: string;
  platform: "Azure" | "AWS";
  modules: Module[];
}

export interface Course {
  id: string;
  level: string; // Ex: "Nível 1 - Cloud Júnior"
  certifications: Certification[];
}
```
