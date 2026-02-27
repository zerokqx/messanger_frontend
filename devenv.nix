{
  pkgs,
  inputs,
  ...
}:

let
  pkgs-playwright = import inputs.nixpkgs-playwright { system = pkgs.stdenv.system; };
  browsers =
    (builtins.fromJSON (builtins.readFile "${pkgs-playwright.playwright-driver}/browsers.json"))
    .browsers;
  chromium-rev = (builtins.head (builtins.filter (x: x.name == "chromium") browsers)).revision;
in
{
  env.GREET = "Yobble";

  env = {
    PLAYWRIGHT_BROWSERS_PATH = "${pkgs-playwright.playwright.browsers}";
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = true;
    PLAYWRIGHT_NODEJS_PATH = "${pkgs.nodejs}/bin/node";
    PLAYWRIGHT_LAUNCH_OPTIONS_EXECUTABLE_PATH = "${pkgs-playwright.playwright.browsers}/chromium-${chromium-rev}/chrome-linux/chrome";
  };
  packages = with pkgs; [
    eslint
  ];
  scripts = {
    testProdBuild.exec = "bun vite build && bun serve ./dist -l 5173 -c ../serve.json";
    build.exec = "bun run build";
    run.exec = "bun run dev";
    "i18n:extract".exec = "bunx i18next-cli extract";
    "i18n:sync".exec = "bunx i18next-cli sync";
    "i18n:types".exec = "bunx i18next-cli types";
    "i18n:status".exec = "bunx i18next-cli status";
    "i18n:lint".exec = "bunx i18next-cli lint";
    "i18n:watch".exec = "bunx i18next-cli extract --watch";
    "i18n:full".exec = "bunx i18next-cli extract && bunx i18next-cli sync && bunx i18next-cli types";
    "i18n:ci".exec = "bunx i18next-cli extract --ci";
  };

  languages.javascript = {
    enable = true;
    bun = {
      enable = true;
      install.enable = true;
    };
  };
  enterShell = ''
    playwrightNpmVersion="$(npm show @playwright/test version)"
    echo "❄️ Playwright nix version: ${pkgs-playwright.playwright.version}"
    echo "📦 Playwright npm version: $playwrightNpmVersion"
    hello
    git --version
  '';

  processes.docker = {
    exec = "./deploy.bash";
  };

  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  git-hooks.hooks.eslint.enable = true;
}
