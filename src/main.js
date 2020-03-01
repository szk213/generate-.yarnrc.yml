const fs = require("fs").promises;
const YAML = require("yaml");

(async () => {
  const packageJsonLock = "target/package-lock.json";
  const yarnRc = "dest/.yarnrc.yml";

  const body = await fs.readFile(packageJsonLock, "utf-8");
  const jsonLock = JSON.parse(body);
  //   console.log(jsonLock.dependencies);

  await fs.writeFile(
    yarnRc,
    YAML.stringify({
      packageExtensions: createPackageExtension(jsonLock.dependencies)
    })
  );
})();

function createPackageExtension(dependencies) {
  let obj = {};
  Object.entries(dependencies)
    // .filter((packageName, value) => value.dev != true)
    .map(([packageName, { requires, dev }]) => {
      // console.log(packageName);
      if (!requires) {
        return;
      }

      if(dev==true){
          return;
      }
      // console.log(requires);
      obj[`${packageName}@*`] = {
        peerDependenciesMeta: createPeerDependenciesMeta(requires)
      };
      return obj;
    });

  return obj;
}

function createPeerDependenciesMeta(requires) {
  const packageNames = Object.keys(requires);
  let obj = {};
  packageNames.map(name => {
    obj[name] = {
      optional: true
    };
  });
  return obj;
}
