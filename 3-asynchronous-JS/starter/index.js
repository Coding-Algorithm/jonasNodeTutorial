const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject('I could not find that file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write a file');
      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map(el => el.body.message)
    console.log(imgs)
    console.log(all);
    // console.log(res.body.message);
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!!!');
  } catch (err) {
    console.log('ERROR');
    throw err;
  }
  return '2: READY';
};

(async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dop pics!');
  } catch (err) {
    console.log('ERROR');
  }
})();

/*
console.log('1: Will get dog pics!');
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dop pics!');
  })
  .catch((err) => {
    console.log(err);
  });
*/

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!!!');
  })
  .catch((err) => {
    console.log(err);
  });
*/

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         console.log('Random dog image saved to file');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
