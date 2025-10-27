{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "Yobble";

  # https://devenv.sh/packages/
  packages = with pkgs; [ git eslint bun ];

  scripts = {

    build.exec = "bun run build";
    run.exec = "bun run dev";

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
