# Guia de Estrutura de Dados e Tipos TS

Este documento define como o Copilot deve estruturar o JSON e as interfaces para suportar a hierarquia exigida: Certificação > Módulos > Submódulos > Blocos > Tópicos.

## Interfaces TypeScript (src/types/course.ts)

```typescript
export interface Topic {
  id: string;
  title: string;
  completed: boolean;
}

export interface Block {
  id: string;
  name: string;
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
  code: string; // ex: AZ-900
  title: string;
  platform: "Azure" | "AWS";
  modules: Module[];
}

export interface Course {
  id: string;
  level: string; // Nível 1 - Cloud Júnior
  certifications: Certification[];
}
```

## Exemplo de JSON de Dados (src/data/initialData.json)

```json
[
  {
    "id": "lvl-1",
    "level": "Nível 1 - Cloud Júnior",
    "certifications": [
      {
        "id": "az-900",
        "code": "AZ-900",
        "title": "Microsoft Azure Fundamentals",
        "platform": "Azure",
        "modules": [
          {
            "id": "mod-1",
            "title": "Módulo 1: Conceitos da nuvem",
            "submodules": [
              {
                "id": "sub-1",
                "title": "Descrever a computação em nuvem",
                "blocks": [
                  {
                    "id": "blk-1",
                    "name": "BLOCO 1",
                    "topics": [
                      {
                        "id": "t1",
                        "title": "Definir computação em nuvem",
                        "completed": false
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
```

## Lógica de CRUD

Ao gerar o código, o Copilot deve implementar funções de "Helper" que permitam ao usuário navegar no objeto profundamente para editar um Topic ou Block específico sem perder a imutabilidade do estado do React.
