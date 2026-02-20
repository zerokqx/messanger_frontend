{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  env.GREET = "Yobble";
  env.LD_LIBRARY_PATH = "${
    with pkgs;
    lib.makeLibraryPath [
      at-spi2-atk
      atk
      cairo
      cups
      dbus
      expat
      fontconfig
      freetype
      gdk-pixbuf
      glib
      gtk3
      libGL
      libuuid
      libxkbcommon
      mesa
      nspr
      nss
      pango
      pipewire
      udev
      xorg.libX11
      xorg.libXcomposite
      xorg.libXcursor
      xorg.libXdamage
      xorg.libXext
      xorg.libXfixes
      xorg.libXi
      xorg.libXrandr
      xorg.libXrender
      xorg.libXtst
      xorg.libxcb
      xorg.xcbutilkeysyms
      alsa-lib
      stdenv.cc.cc.lib
    ]
  }";
  packages = with pkgs; [
    git
    eslint
    stdenv.cc.cc.lib
    bun
    google-chrome
    at-spi2-atk
    atk
    cairo
    cups
    dbus
    expat
    fontconfig
    freetype
    gdk-pixbuf
    glib
    gtk3
    libGL
    libuuid
    libxkbcommon
    mesa
    nspr
    nss
    pango
    pipewire
    udev
    xorg.libX11
    xorg.libXcomposite
    xorg.libXcursor
    xorg.libXdamage
    xorg.libXext
    xorg.libXfixes
    xorg.libXi
    xorg.libXrandr
    xorg.libXrender
    xorg.libXtst
    xorg.libxcb
    xorg.xcbutilkeysyms
    alsa-lib
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

  enterShell = ''
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
