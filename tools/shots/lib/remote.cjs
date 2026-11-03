// A remote e2e slot (PW_REMOTE_WS set) tunnels <loopback> AND every name /etc/hosts puts on this machine back
// here. On the Deck that list holds theprototype.app, so the deployed app's own calls to it (the CC0 proxy at
// theprototype.app/cc0: Free assets ▸ Materials said "Could not reach the asset site") went to this machine.
// The shim reads PW_REMOTE_EXPOSE once, when node starts, so a run without it is re-run with loopback only.

/** the env to re-run with, or null when this run is already right */
function loopbackOnlyEnv(env) {
	if (!env.PW_REMOTE_WS || env.PW_REMOTE_EXPOSE !== undefined) return null;
	return { ...env, PW_REMOTE_EXPOSE: '<loopback>' };
}

/** call first thing in a CLI: re-runs this script with loopback-only tunnelling when it needs it (never returns then) */
function exposeLoopbackOnly() {
	const env = loopbackOnlyEnv(process.env);
	if (!env) return;
	const r = require('child_process').spawnSync(process.execPath, process.argv.slice(1), { stdio: 'inherit', env });
	process.exit(r.status ?? 1);
}

module.exports = { loopbackOnlyEnv, exposeLoopbackOnly };
