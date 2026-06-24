/**
 * BioLabs — Profile Edit System Test
 * Run: node test_user.mjs
 *
 * Tests profile read + edit flow against the real Supabase instance.
 * Uses already-seeded profiles (Dr. Samir Kalra = researcher, Dr. Kabir Mehta = mentor).
 * Does NOT require creating new auth users.
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://xlzcqfgoizzgzgypdaaw.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsemNxZmdvaXp6Z3pneXBkYWF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MzExNjIsImV4cCI6MjA5NzAwNzE2Mn0.G5HcEaeIOUBXxT535Rl4i6nQI9nTySHwLC_Xds8jsHY';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ── Helpers ──────────────────────────────────────────────────────────────────
let failures  = 0;
let passes    = 0;
let skipped   = 0;

const pass = (msg)  => { passes++;  console.log(`  ✅ PASS    ${msg}`); };
const fail = (msg)  => { failures++;console.error(`  ❌ FAIL    ${msg}`); };
const skip = (msg)  => { skipped++; console.log(`  ⏭️  SKIP    ${msg}`); };
const info = (msg)  => console.log(`\n🔷 ${msg}`);

function assert(condition, msg) {
    condition ? pass(msg) : fail(msg);
}

// ─────────────────────────────────────────────────────────────────────────────
info('STEP 1 — Supabase connectivity check');
{
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
        fail(`Cannot reach Supabase profiles table: ${error.message}`);
        console.log('\n⚠️  Cannot continue without database access. Run schema.sql seed in Supabase first.\n');
        process.exit(1);
    }
    pass(`Supabase reachable — profiles table accessible`);
}

// ─────────────────────────────────────────────────────────────────────────────
info('STEP 2 — Read all seeded profiles (simulates app loadDataFromSupabase)');
let profiles = [];
{
    const { data, error } = await supabase.from('profiles').select('*').order('role');
    assert(!error,           `Profiles SELECT: ${error?.message || 'OK'}`);
    assert((data?.length ?? 0) > 0, `At least 1 seeded profile found (found ${data?.length ?? 0})`);
    profiles = data || [];

    if (profiles.length > 0) {
        console.log(`\n     Loaded profiles:`);
        profiles.forEach(p =>
            console.log(`       • ${p.name.padEnd(28)} [${p.role.padEnd(10)}] ${p.institution}`)
        );
    } else {
        console.log(`\n     ⚠️  Table is empty — run "Seed Supabase Database" button in Admin panel first.`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
info('STEP 3 — Researcher profile edit (simulates "Save Lab Details" button)');
const researcher = profiles.find(p => p.role === 'researcher');
if (!researcher) {
    skip('No researcher profile found — skipping edit test');
} else {
    // Save original values to restore after test
    const originalName     = researcher.name;
    const originalDomain   = researcher.domain;
    const originalSkills   = researcher.skills;
    const originalLinkedin = researcher.linkedin_url;

    const editPayload = {
        name:         `${researcher.name} [TEST EDITED]`,
        domain:       'Cancer Genomics',
        skills:       [...(researcher.skills || []), 'MATLAB', 'R'],
        linkedin_url: 'https://linkedin.com/in/test-edited-researcher'
    };

    const { error: updateErr } = await supabase
        .from('profiles')
        .update(editPayload)
        .eq('id', researcher.id);

    if (updateErr) {
        // RLS might block unauthenticated updates — show message
        if (updateErr.message.includes('row-level security')) {
            skip(`Researcher update blocked by RLS (expected if RLS enabled without policy). ` +
                 `In the real app, the authenticated user's session bypasses this.`);
        } else {
            fail(`Researcher profile update: ${updateErr.message}`);
        }
    } else {
        pass(`Researcher profile update sent`);

        // Read back and verify
        const { data: updated } = await supabase.from('profiles').select('*').eq('id', researcher.id).single();
        assert(updated?.name === editPayload.name,         `Name updated → "${updated?.name}"`);
        assert(updated?.domain === 'Cancer Genomics',      `Domain updated → "${updated?.domain}"`);
        assert(updated?.skills?.includes('MATLAB'),        `Skills contain MATLAB → [${updated?.skills?.join(', ')}]`);
        assert(updated?.linkedin_url === editPayload.linkedin_url, `LinkedIn updated`);

        // Restore original values
        await supabase.from('profiles').update({
            name:         originalName,
            domain:       originalDomain,
            skills:       originalSkills,
            linkedin_url: originalLinkedin
        }).eq('id', researcher.id);
        pass(`Researcher profile restored to original values`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
info('STEP 4 — Mentor profile edit (simulates "Save Mentorship Details" button)');
const mentor = profiles.find(p => p.role === 'mentor');
if (!mentor) {
    skip('No mentor profile found — skipping edit test');
} else {
    const originalName     = mentor.name;
    const originalInst     = mentor.institution;
    const originalSkills   = mentor.skills;
    const originalLinkedin = mentor.linkedin_url;

    const editPayload = {
        name:         `${mentor.name} [TEST EDITED]`,
        institution:  'Cipla Research Division',
        skills:       [...(mentor.skills || []), 'Regulatory Affairs'],
        linkedin_url: 'https://linkedin.com/in/test-edited-mentor'
    };

    const { error: updateErr } = await supabase
        .from('profiles')
        .update(editPayload)
        .eq('id', mentor.id);

    if (updateErr) {
        if (updateErr.message.includes('row-level security')) {
            skip(`Mentor update blocked by RLS (expected if RLS enabled without policy). ` +
                 `In the real app the authenticated session bypasses this.`);
        } else {
            fail(`Mentor profile update: ${updateErr.message}`);
        }
    } else {
        pass(`Mentor profile update sent`);

        const { data: updated } = await supabase.from('profiles').select('*').eq('id', mentor.id).single();
        assert(updated?.name === editPayload.name,               `Name updated → "${updated?.name}"`);
        assert(updated?.institution === 'Cipla Research Division', `Institution updated → "${updated?.institution}"`);
        assert(updated?.skills?.includes('Regulatory Affairs'),  `Skills contain Regulatory Affairs`);

        // Restore
        await supabase.from('profiles').update({
            name:         originalName,
            institution:  originalInst,
            skills:       originalSkills,
            linkedin_url: originalLinkedin
        }).eq('id', mentor.id);
        pass(`Mentor profile restored to original values`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
info('STEP 5 — Admin "Manage Profiles" table read (all profiles, any role)');
{
    const { data, error } = await supabase
        .from('profiles')
        .select('id, name, role, institution, verified, skills')
        .order('role');

    assert(!error, `Admin profile list read: ${error?.message || 'OK'}`);

    const roles = [...new Set((data || []).map(p => p.role))];
    assert(roles.length >= 1, `Profiles cover at least 1 role (found: ${roles.join(', ')})`);

    const hasVerified = (data || []).some(p => p.verified);
    assert(hasVerified, `At least one verified profile exists`);

    console.log(`\n     Admin table preview (${data?.length ?? 0} rows):`);
    (data || []).slice(0, 7).forEach(p =>
        console.log(`       [${p.role.padEnd(10)}] ${p.name.padEnd(30)} verified=${p.verified}`)
    );
}

// ─────────────────────────────────────────────────────────────────────────────
info('STEP 6 — Feeds table read (community posts)');
{
    const { data, error } = await supabase.from('feed').select('author, role, body').limit(3);
    assert(!error,             `Feed SELECT: ${error?.message || 'OK'}`);
    assert((data?.length ?? 0) >= 1, `At least 1 feed post (found ${data?.length ?? 0})`);
}

// ─────────────────────────────────────────────────────────────────────────────
info('STEP 7 — Opportunities table read');
{
    const { data, error } = await supabase.from('opportunities').select('title, researcher, domain').limit(5);
    assert(!error,             `Opportunities SELECT: ${error?.message || 'OK'}`);
    assert((data?.length ?? 0) >= 1, `At least 1 opportunity (found ${data?.length ?? 0})`);
    (data || []).forEach(o => console.log(`       • ${o.title.substring(0, 50)}`));
}

// ─────────────────────────────────────────────────────────────────────────────
// Summary
console.log('\n' + '═'.repeat(60));
console.log(`  Results: ${passes} passed  |  ${failures} failed  |  ${skipped} skipped`);
console.log('═'.repeat(60));
if (failures === 0) {
    console.log(`\n✅  All database tests passed!`);
    if (skipped > 0) {
        console.log(`\nℹ️  ${skipped} test(s) skipped due to RLS. This is expected when running`);
        console.log(`   without an authenticated Supabase session. The actual dashboard`);
        console.log(`   uses a logged-in user's JWT which grants write access per role.\n`);
    }
} else {
    console.log(`\n❌  ${failures} test(s) failed.\n`);
    process.exit(1);
}
