import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const index=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
const login=readFileSync(new URL('../dist/login.js',import.meta.url),'utf8');
const app=readFileSync(new URL('../dist/app.js',import.meta.url),'utf8');
const manifest=JSON.parse(readFileSync(new URL('../dist/manifest.webmanifest',import.meta.url),'utf8'));

test('production entry starts at login',()=>{
  assert.match(index,/viewport-fit=cover/);
  assert.match(index,/class="login-screen"/);
  assert.match(index,/manifest\.webmanifest/);
  assert.equal(manifest.start_url,'./#login');
  assert.equal(manifest.display,'standalone');
});

test('required login methods are present',()=>{
  for(const label of ['PT BR','EN US','ES ES','Entrar com Google','Entrar com Biometria','Entrar com StackUp ID','Criar conta StackUp']) assert.ok(login.includes(label),label);
});

test('preview bypass is not shipped',()=>{
  const published=index+login+app;
  assert.ok(!published.includes('Explorar prévia'));
  assert.ok(!published.includes('Explore preview'));
  assert.ok(!published.includes('ESTA PRÉVIA'));
  assert.ok(!login.includes('href="#home"'));
});

test('app routes are protected by authenticated entry',()=>{
  assert.ok(app.includes("sessionStorage.getItem('stackup.authenticated')==='1'"));
  assert.ok(app.includes("location.hash='login'"));
  assert.ok(login.includes("sessionStorage.setItem('stackup.authenticated','1')"));
});
