<script lang="ts">
	import cx from 'classnames'
	import RecordCard from '$lib/record/RecordCard.svelte'
	import type { Records, Record, ReferenceFieldTypes, Table } from '@undb/core'
	import { Alert, Button, Checkbox, CloseButton, Modal, Search, Spinner } from 'flowbite-svelte'
	import VirtualList from 'svelte-tiny-virtual-list'
	import { tableById } from '$lib/store/table'
	import { writable } from 'svelte/store'
	import { t } from '$lib/i18n'
	import { isString } from 'lodash-es'

	let loading = false
	let initialLoading = false
	let open = false

	export let readonly = false

	export let foreignTableId: string
	export let value: string[] = []
	export let field: ReferenceFieldTypes
	export let getForeignRecords: (q?: string) => Promise<Records>
	export let getInitRecords: () => Promise<Records>

	let records = writable<Records>([])
	let initialRecords: Records = []
	const recordsMap = writable(new Map<string, Record>())

	const change = (e: Event, recordId: string) => {
		const target = e.target as HTMLInputElement
		if (target.checked) {
			add(recordId)
		} else {
			remove(recordId)
		}
	}

	let loaded = false
	async function getInitial() {
		if (!open && !loaded && value?.length) {
			initialLoading = true
			initialRecords = await getInitRecords()
			initialLoading = false
			loaded = true
		}
	}

	$: value, getInitial()

	let foreignTable: Table | undefined
	$: if (foreignTableId) {
		$tableById(foreignTableId).then((t) => (foreignTable = t))
	}
	$: schema = foreignTable?.schema

	$: {
		for (const record of initialRecords) {
			recordsMap.set($recordsMap.set(record.id.value, record))
		}
		for (const record of $records) {
			recordsMap.set($recordsMap.set(record.id.value, record))
		}
	}

	async function getForeign() {
		loading = true
		records.set(await getForeignRecords())
		loading = false
	}

	function remove(recordId: string) {
		value = value?.filter((r) => r !== recordId) ?? []
	}

	function add(recordId: string) {
		value = [...(value ?? []), recordId]
	}

	$: if (open) getForeign()
	$: selected = Array.isArray(value) ? value?.map((r) => $recordsMap.get(r)!) ?? [] : []

	let form: HTMLFormElement

	const onSubmit = async (e: Event) => {
		e.preventDefault()
		const formData = new FormData(form)
		const query = formData.get('search')
		if (isString(query) && !!query) {
			records.set(await getForeignRecords(query))
		}
	}
</script>

{#if schema}
	<div class="space-y-2 max-h-96 overflow-y-auto mb-2">
		<div class="space-y-2 h-full overflow-auto">
			{#each selected as record}
				{#if !!record}
					<div class="group relative">
						<RecordCard
							{field}
							{record}
							{schema}
							class="!py-2 w-full shadow-none hover:shadow-md transition hover:border-blue-400 border-2 !max-w-none"
							role="button"
						/>
						{#if !readonly}
							<CloseButton
								on:click={() => remove(record.id.value)}
								class="absolute z-50 right-0 top-[50%] text-sm translate-y-[-55%] translate-x-[-50%] hidden group-hover:block text-gray-500"
							/>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</div>

	{#if !readonly}
		<Button
			color="alternative"
			on:click={() => (open = true)}
			{...$$restProps}
			class={cx('space-x-2', $$restProps.class)}
		>
			{#if initialLoading}
				<Spinner size="4" />
			{:else}
				<i class="ti ti-plus" />
				<span>{$t('Select Record')}</span>
			{/if}
		</Button>
		<Modal title={$t('Select Record') ?? undefined} bind:open size="md" class="w-[700px] h-[600px]">
			{#if loading}
				<div class="flex w-full h-full items-center justify-center">
					<Spinner />
				</div>
			{:else if !$records.length}
				<Alert>{$t('no record available')}</Alert>
			{:else}
				<form bind:this={form} on:submit={onSubmit}>
					<div class="flex items-center gap-2">
						<Search name="search" placeholder={$t('search')} size="sm"></Search>
						<Button type="submit" size="xs" class="!p-2.5 hidden lg:block">
							<svg
								class="w-3 h-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</Button>
					</div>
				</form>
				<VirtualList height={600} width="100%" itemCount={$records.length} itemSize={46}>
					<div slot="item" let:index let:style {style} class="flex items-stretch">
						<Checkbox
							inline
							value={$records[index].id.value}
							custom
							on:change={(e) => {
								change(e, $records[index].id.value)
								open = false
							}}
							class="w-full"
						>
							<RecordCard
								{field}
								{schema}
								record={$records[index]}
								class="!py-2 w-full shadow-none hover:shadow-md transition hover:border-blue-400 border-2 !max-w-none"
								role="button"
							/>
						</Checkbox>
					</div>
				</VirtualList>
			{/if}
		</Modal>
	{/if}
{/if}
