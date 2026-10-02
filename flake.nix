{
  description = "Deutschlandticket Calculator";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in {
      packages = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = (pkgs.buildNpmPackage.override { nodejs = pkgs.nodejs_22; }) {
            pname = "d-ticket-calculator";
            version = "2.0.2";
            src = ./.;

            npmDepsHash = "sha256-evGTl8b3+Tz555x/rHSB1JhtZwl4MZe8RKw462HUnpc=";
            npmBuildScript = "predeploy";

            preBuild = ''
              export HOME="$TMPDIR"
              export CI=1
              export EXPO_NO_TELEMETRY=1
            '';

            installPhase = ''
              runHook preInstall
              mkdir -p "$out/share/d-ticket-calculator"
              cp -r dist/. "$out/share/d-ticket-calculator/"
              runHook postInstall
            '';
          };
        });

      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = pkgs.mkShell {
            packages = [ pkgs.nodejs_22 ];
            EXPO_NO_TELEMETRY = "1";
          };
        });
    };
}
