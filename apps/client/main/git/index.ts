import * as Git from 'nodegit';
import { join } from 'path';

const url = 'https://github.com/zkm22/vercel.git';

const localPath = join(__dirname, '_temp');

const cloneOptions: Git.CloneOptions = {
  fetchOpts: {
    callbacks: {
      credentials: function () {
        console.log(process.env.git_token)
        return Git.Credential.userpassPlaintextNew(process.env.git_token, "x-oauth-basic");
      },
      certificateCheck: function() {
        return 0;
      }
    }
  }
};

export async function clone() {
  try {
    const res = await Git.Clone(url, localPath, cloneOptions);
    console.log(res);
  } catch(err) {
    console.error(err);
  }
}

