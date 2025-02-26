<script lang="ts">
	import { Button, Checkbox, Dropdown } from 'flowbite-svelte'
	import CollaboratorComponent from '../CellComponents/CollaboratorComponent.svelte'
	import { trpc } from '$lib/trpc/client'
	import { t } from '$lib/i18n'
	import type { ICollaboratorProfile } from '@undb/core'

	export let value: string[] | undefined
	export let readonly = false

	let open = false
	let opened = false

	$: if (!value) {
		value = []
	}

	$: if (open) {
		opened = true
	}

	$: query = trpc().user.users.query({}, { enabled: opened })
	$: members = $query.data?.users ?? []

	$: selectedQuery = trpc().user.users.query({ ids: value }, { enabled: !!value?.length && !opened })
	$: selectedMembers = $selectedQuery?.data?.users ?? []

	$: allMembers = [...members, ...selectedMembers]

	let selected: ICollaboratorProfile[] = []
	$: if (value?.length)
		selected = value?.map((userId) => allMembers.find((m) => m.userId === userId)!).filter(Boolean) ?? []
</script>

<Button color="alternative" class="inline-flex gap-3 max-h-10" disabled={readonly}>
	{#if selected.length}
		{#each selected as member}
			<CollaboratorComponent username={member.username} avatar={member.avatar} color={member.color} />
		{/each}
	{:else}
		{$t('Select Collaborator')}
	{/if}
</Button>
{#if !readonly}
	<Dropdown style="z-index: 50" bind:open placement="bottom-start" class="w-[400px] border z-[99999]">
		<div class="w-full">
			{#each members as member}
				{@const isSelected = selected.some((s) => s.userId === member.userId)}
				<Checkbox bind:group={value} value={member.userId} custom class="flex w-full">
					<span class="inline-flex items-center justify-between px-4 py-2 cursor-pointer w-full hover:bg-gray-100">
						<CollaboratorComponent username={member.username} avatar={member.avatar} color={member.color} />
						{#if isSelected}
							<i class="ti ti-check" />
						{/if}
					</span>
				</Checkbox>
			{/each}
		</div>
	</Dropdown>
{/if}
