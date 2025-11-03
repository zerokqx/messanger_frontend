{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "Yobble";

  # https://devenv.sh/packages/
  packages = with pkgs; [ git eslint bun ];

  scripts = {

    build.exec = "bun run build";
    run.exec = "bun run dev";
    "i18n:extract".exec = "bunx i18next-cli extract";
    "i18n:sync".exec = "bunx i18next-cli sync";
    "i18n:types".exec = "bunx i18next-cli types";
    "i18n:status".exec = "bunx i18next-cli status";
    "i18n:lint".exec = "bunx i18next-cli lint";
    "i18n:watch".exec = "bunx i18next-cli extract --watch";
    "i18n:full".exec =
      "bunx i18next-cli extract && bunx i18next-cli sync && bunx i18next-cli types";
    "i18n:ci".exec = "bunx i18next-cli extract --ci";
  };

  enterShell = ''
    hello
    git --version
  '';

  processes.docker = { exec = "./deploy.bash"; };

  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  git-hooks.hooks.eslint.enable = true;
}
