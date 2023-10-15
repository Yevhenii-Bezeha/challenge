const path = require("path");

function disableInCI(rule) {
    if (process.env.CI !== undefined) {
        return "off";
    }

    return rule;
}

const globalJSRules = {
    "array-element-newline": [
        "error",
        {
            ArrayExpression: "consistent",
            ArrayPattern: { minItems: 3 }
        }
    ],
    "arrow-body-style": ["error", "as-needed", { requireReturnForObjectLiteral: true }],
    "arrow-parens": ["error", "as-needed"],
    "class-methods-use-this": "off",
    "comma-dangle": ["error", "never"],
    curly: ["error", "all"],
    "function-paren-newline": ["error", "multiline-arguments"],
    "implicit-arrow-linebreak": "off",
    "import/consistent-type-specifier-style": "error",
    "import/extensions": "off",
    "import/no-duplicates": "off",
    "import/no-import-module-exports": disableInCI("error"),
    "import/no-relative-packages": disableInCI("error"),
    "import/no-self-import": disableInCI("error"),
    indent: disableInCI(["error", 4, { SwitchCase: 1 }]),
    "linebreak-style": ["error", "windows"],
    "max-len": [
        "error",
        {
            code: 120,
            ignoreComments: true,
            ignorePattern: "(^import .* from .*;$)|(^\\} from .*;$)",
            ignoreTrailingComments: true
        }
    ],
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 3 }],
    "no-console": disableInCI("warn"),
    "object-curly-newline": [
        "error",
        {
            ObjectExpression: { consistent: true },
            ObjectPattern: { multiline: true },
            ImportDeclaration: { consistent: true },
            ExportDeclaration: {
                multiline: true,
                minProperties: 3
            }
        }
    ],
    "object-curly-spacing": ["error", "always"],
    "operator-linebreak": "off",
    "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "block-like", next: "*" },
        { blankLine: "always", prev: "*", next: "block-like" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "always", prev: "*", next: ["const", "let", "var"] },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
        { blankLine: "any", prev: "case", next: "case" },
        { blankLine: "always", prev: "*", next: "continue" },
        { blankLine: "always", prev: "*", next: "return" }
    ],
    "prefer-destructuring": [
        "error",
        {
            array: false,
            object: true
        },
        { enforceForRenamedProperties: false }
    ],
    "switch-case/newline-between-switch-case": ["error", "always", { fallthrough: "never" }],
    semi: ["error", "always"],
    quotes: ["error", "single"]
};

/**
 * @see https://typescript-eslint.io/linting/troubleshooting#fixing-the-error
 */
module.exports = {
    root: true,
    parserOptions: {
        project: "./tsconfig.base.json"
    },
    overrides: [
        {
            files: ["*.ts"],
            plugins: ["@nrwl/nx", "@typescript-eslint", "import", "switch-case", "rxjs", "rxjs-angular", "unicorn"],
            extends: [
                "airbnb-base",
                "airbnb-typescript/base",
                "plugin:@angular-eslint/recommended",
                "plugin:@angular-eslint/template/process-inline-templates",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:@typescript-eslint/strict",
                "plugin:rxjs/recommended"
            ],
            rules: {
                ...globalJSRules,
                "@angular-eslint/prefer-on-push-component-change-detection": "error",
                // NOTE: `standalone` is not yet supported
                // @see https://github.com/angular-eslint/angular-eslint/issues/1232
                "@angular-eslint/sort-ngmodule-metadata-arrays": "error",
                "@nrwl/nx/enforce-module-boundaries": disableInCI([
                    "error",
                    {
                        allowCircularSelfDependency: false
                    }
                ]),
                "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
                "@typescript-eslint/comma-dangle": ["error", "never"],
                "@typescript-eslint/consistent-type-assertions": disableInCI("error"),
                "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
                // https://github.com/typescript-eslint/typescript-eslint/issues/4268
                // "@typescript-eslint/consistent-type-imports": [
                //     "error",
                //     { fixStyle: "separate-type-imports", prefer: "type-imports" }
                // ],
                "@typescript-eslint/indent": "off",
                "@typescript-eslint/lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
                "@typescript-eslint/member-ordering": disableInCI([
                    "error",
                    {
                        default: [
                            "signature",
                            "call-signature",

                            // Fields
                            ["decorated-field", "decorated-method", "get", "set"],
                            "static-field",
                            "public-abstract-field",
                            "public-instance-field",
                            "public-field",
                            "protected-abstract-field",
                            "protected-instance-field",
                            "protected-field",
                            "private-instance-field",
                            "private-field",

                            "static-initialization",
                            "static-method",

                            "constructor",
                            "public-method",
                            "protected-method",
                            "private-method"
                        ]
                    }
                ]),
                "@typescript-eslint/naming-convention": disableInCI([
                    "warn",
                    {
                        selector: "interface",
                        format: ["PascalCase"],
                        custom: {
                            regex: "^I[A-Z]",
                            match: true
                        }
                    }
                ]),
                "@typescript-eslint/no-base-to-string": disableInCI("warn"),
                "@typescript-eslint/no-unnecessary-condition": disableInCI("warn"),
                "@typescript-eslint/no-explicit-any": "error",
                "@typescript-eslint/no-extraneous-class": "off",
                "@typescript-eslint/no-floating-promises": disableInCI(["error", { ignoreVoid: true }]),
                "@typescript-eslint/no-import-type-side-effects": "error",
                "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true, ignoreProperties: true }],
                "@typescript-eslint/no-misused-promises": disableInCI("error"),
                "@typescript-eslint/no-shadow": "error",
                "@typescript-eslint/no-throw-literal": "error",
                "@typescript-eslint/no-unsafe-argument": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-assignment": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-call": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-enum-comparison": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-member-access": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-return": disableInCI("warn"),
                "@typescript-eslint/no-unused-vars": [
                    "error",
                    {
                        argsIgnorePattern: "^_$",
                        varsIgnorePattern: "^_$",
                        caughtErrorsIgnorePattern: "^_$"
                    }
                ],
                "@typescript-eslint/prefer-for-of": disableInCI("warn"),
                "@typescript-eslint/prefer-literal-enum-member": disableInCI("warn"),
                "@typescript-eslint/prefer-nullish-coalescing": "error",
                "@typescript-eslint/prefer-optional-chain": disableInCI("warn"),
                "@typescript-eslint/restrict-plus-operands": disableInCI("warn"),
                "@typescript-eslint/restrict-template-expressions": disableInCI("warn"),
                "@typescript-eslint/typedef": [
                    "error",
                    {
                        memberVariableDeclaration: true,
                        parameter: true,
                        propertyDeclaration: true
                    }
                ],
                "@typescript-eslint/unbound-method": "off",
                "consistent-return": ["error", { treatUndefinedAsUnspecified: false }],
                "default-case": "error",
                "import/no-cycle": disableInCI("error"),
                "import/no-extraneous-dependencies": disableInCI(["error", { packageDir: path.join(__dirname, "./") }]),
                "import/order": disableInCI([
                    "error",
                    {
                        alphabetize: {
                            order: "asc",
                            caseInsensitive: true
                        },
                        pathGroupsExcludedImportTypes: [],
                        groups: [["builtin", "external"], "internal", "parent", "sibling", "index"],
                        "newlines-between": "always"
                    }
                ]),
                "import/prefer-default-export": "off",
                "max-classes-per-file": disableInCI("warn"),
                "no-bitwise": disableInCI("warn"),
                "no-case-declarations": "error",
                "no-param-reassign": disableInCI("warn"),
                "no-plusplus": disableInCI("warn"),
                "no-restricted-imports": [
                    "error",
                    {
                        paths: [
                            {
                                name: "lodash-es",
                                message: "Import [module] from lodash-es/[module] instead"
                            }
                        ]
                    }
                ],
                "no-underscore-dangle": "off",
                "no-void": ["error", { allowAsStatement: true }],
                "rxjs-angular/prefer-takeuntil": [
                    "error",
                    {
                        alias: ["takeUntilDestroyed", "untilDestroyed"],
                        checkComplete: true,
                        checkDecorators: ["Component", "Injectable"],
                        checkDestroy: false // @see https://github.com/cartant/eslint-plugin-rxjs-angular/issues/13
                    }
                ],
                "rxjs/no-compat": "error",
                "rxjs/no-connectable": "error",
                "rxjs/no-implicit-any-catch": "off",
                "rxjs/no-unsafe-first": ["error", { observable: "[Aa]ction(s|s\\$|\\$)$" }],
                "rxjs/no-unsafe-takeuntil": [
                    "error",
                    {
                        alias: ["takeUntilDestroyed", "untilDestroyed"]
                    }
                ],
                "unicorn/no-abusive-eslint-disable": "error"
            }
        },
        {
            files: ["**/__mocks__/**/*.ts"],
            env: {
                jest: true
            },
            rules: {
                "@angular-eslint/prefer-on-push-component-change-detection": disableInCI("warn"),
                "@typescript-eslint/no-explicit-any": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-call": "off",
                "@typescript-eslint/no-unsafe-member-access": "off"
            }
        },
        {
            files: ["*.spec.ts"],
            extends: ["plugin:jest/style", "plugin:jest-formatting/strict", "plugin:jest/recommended"],
            env: {
                jest: true
            },
            rules: {
                "@angular-eslint/prefer-on-push-component-change-detection": "off",
                "@typescript-eslint/no-explicit-any": disableInCI("warn"),
                "@typescript-eslint/no-extraneous-class": "off",
                "@typescript-eslint/no-unsafe-assignment": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-call": disableInCI("warn"),
                "@typescript-eslint/no-unsafe-member-access": disableInCI("warn"),
                "@typescript-eslint/no-shadow": disableInCI("warn"),
                "import/no-extraneous-dependencies": disableInCI("warn"),
                "jest/prefer-called-with": "error",
                "jest/prefer-strict-equal": "error",
                "jest/no-commented-out-tests": disableInCI("warn"),
                "jest/no-disabled-tests": disableInCI("warn"),
                "jest/no-done-callback": disableInCI("warn"),
                "jest/no-mocks-import": disableInCI("warn"),
                "max-len": [
                    "error",
                    {
                        code: 120,
                        comments: 140,
                        ignoreUrls: true,
                        ignorePattern: "(^import .* from .*;$)|(^\\s*it\\((.*?),)|(^jest.*;$)",
                        ignoreTrailingComments: true
                    }
                ],
                "no-restricted-imports": [
                    "error",
                    {
                        paths: [
                            {
                                name: "@core/directives",
                                message: "Import [module] from @core/directives/[module] instead"
                            },
                            {
                                name: "@core/guards",
                                message: "Import [module] from @core/guards/[module] instead"
                            },
                            {
                                name: "@core/pipes",
                                message: "Import [module] from @core/pipes/[module] instead"
                            },
                            {
                                name: "@core/services",
                                message: "Import [module] from @core/services/[module] instead"
                            },
                            {
                                name: "@shared/services",
                                message: "Import [module] from @shared/services/[module] instead"
                            },
                            {
                                name: "@utils/common",
                                message: "Import [module] from @utils/common/[module] instead"
                            },
                            {
                                name: "@utils/configuration",
                                message: "Import [module] from @utils/configuration/[module] instead"
                            },
                            {
                                name: "@utils/core",
                                message: "Import [module] from @utils/core/[module] instead"
                            },
                            {
                                name: "@utils/validators",
                                message: "Import [module] from @utils/validators/[module] instead"
                            }
                        ]
                    }
                ]
            }
        },
        {
            files: ["*.html"],
            extends: ["plugin:@angular-eslint/template/recommended"],
            rules: {
                "@angular-eslint/template/attributes-order": [
                    "error",
                    {
                        alphabetical: false,
                        order: [
                            "TEMPLATE_REFERENCE", // e.g. `<input #inputRef>`
                            "STRUCTURAL_DIRECTIVE", // e.g. `*ngIf="true"`, `*ngFor="let item of items"`
                            "INPUT_BINDING", // e.g. `[id]="3"`, `[attr.colspan]="colspan"`, [style.width.%]="100", [@triggerName]="expression", `bind-id="handleChange()"`
                            "ATTRIBUTE_BINDING", // e.g. `<input required>`, `id="3"`
                            "OUTPUT_BINDING", // e.g. `(idChange)="handleChange()"`, `on-id="handleChange()"`
                            "TWO_WAY_BINDING" // e.g. `[(id)]="id"`, `bindon-id="id"
                        ]
                    }
                ],
                // @see https://medium.com/showpad-engineering/e1a50f9c0496
                "@angular-eslint/template/no-call-expression": disableInCI("warn"),
                "@angular-eslint/template/no-duplicate-attributes": disableInCI("warn"),
                "@angular-eslint/template/no-inline-styles": disableInCI("warn"),
                "max-len": ["error", { code: 120 }]
            }
        },
        {
            files: ["*.js", "*.cjs", "*.mjs"],
            parserOptions: { ecmaVersion: 2022 },
            env: { es6: true },
            plugins: ["prettier"],
            extends: ["plugin:prettier/recommended"],
            rules: {
                ...globalJSRules,
                quotes: ["error", "double"],
                "prettier/prettier": [
                    "error",
                    {
                        arrowParens: "avoid",
                        endOfLine: "crlf",
                        singleQuote: false,
                        trailingComma: "none"
                    }
                ]
            }
        },
        {
            files: ["*.mjs"],
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module"
            }
        },
        {
            files: ["jest.*.mjs"],
            rules: {
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "import/no-relative-packages": "off"
            }
        }
    ]
};
