<script lang="ts">
	import cx from 'classnames'
	import { getTable, getView } from '$lib/store/table'
	import { page } from '$app/stores'
	import ViewIcon from '$lib/view/ViewIcon.svelte'
	import { Dropdown, DropdownDivider, DropdownItem } from 'flowbite-svelte'
	import { trpc } from '$lib/trpc/client'
	import { ViewVO, ViewName, type IExportType, FormId } from '@undb/core'
	import { tick } from 'svelte'
	import { goto, invalidate } from '$app/navigation'
	import Portal from 'svelte-portal'
	import { t } from '$lib/i18n'
	import { selectedFormId } from '$lib/store/drawer'
	import { formEditorModal } from '$lib/store/modal'
	import { hasPermission } from '$lib/store/authz'

	const table = getTable()
	const currentView = getView()

	export let view: ViewVO

	$: active = $currentView.id.value === view.id.value

	$: name = view.name.value

	let updating = false
	let open = false
	let input: HTMLInputElement

	const handleUpdating = async () => {
		await tick()
		open = false
		input.focus()
		input.select()
	}
	$: if (updating) handleUpdating()

	const updateName = trpc().table.view.updateName.mutation({
		async onSuccess(data, variables, context) {
			await invalidate(`table:${$table.id.value}`)
			view.name = new ViewName({ value: name })
			open = false
		},
	})
	const update = async () => {
		updating = false
		$updateName.mutate({
			tableId: $table.id.value,
			view: {
				id: view.id.value,
				name,
			},
		})
	}

	const duplicate = trpc().table.view.duplicate.mutation({
		async onSuccess(data, variables, context) {
			await invalidate(`table:${$table.id.value}`)
			open = false
			await tick()
			goto(`/t/${$table.id.value}/${$table.viewsOrder.last}`)
		},
	})
	const duplicateView = async () => {
		$duplicate.mutate({
			tableId: $table.id.value,
			id: view.id.value,
		})
	}

	const deleteMutation = trpc().table.view.delete.mutation({
		async onSuccess(data, variables, context) {
			await invalidate(`table:${$table.id.value}`)
		},
	})

	const deleteView = async () => {
		const index = $table.viewsOrder.order.findIndex((id) => id === view.id.value)
		await $deleteMutation.mutateAsync({
			tableId: $table.id.value,
			id: view.id.value,
		})
		const previous = $table.viewsOrder.order[index - 1] ?? $table.viewsOrder.order[0]
		goto(`/t/${$table.id.value}/${previous}`)
		open = false
		await tick()
	}

	const exportGrid = async (type: IExportType) => {
		const res = await fetch(`/api/record/export/grid/${$table.id.value}/${view.id.value}/${type}`)
		open = false
		const blob = await res.blob()
		const a = document.createElement('a')
		a.href = window.URL.createObjectURL(blob)
		a.download = $table.name.value + ' - ' + view.name.value
		a.click()
		a.remove()
	}

	const createFormFromViewMutation = trpc().table.form.createFromView.mutation({
		async onSuccess(data, variables, context) {
			const id = variables.form.id
			await invalidate(`table:${$table.id.value}`)
			selectedFormId.set(id)
			formEditorModal.open()
		},
	})

	const createFormFromView = () => {
		const id = FormId.createId()
		$createFormFromViewMutation.mutate({
			tableId: $table.id.value,
			viewId: view.id.value,
			form: { id },
		})
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cx('group', active && 'min-w-[100px] max-w-[200px]')}
	data-view-id={view.id.value}
	on:dblclick={() => (updating = !updating)}
>
	<a
		href={active ? $page.url.pathname : `/t/${$table.id.value}/${view.id.value}`}
		type="button"
		role="tab"
		class={cx(
			'inline-flex w-full justify-between items-center gap-2 text-sm font-medium text-center disabled:cursor-not-allowed px-4 py-2 border-b-2',
			active
				? 'text-blue-600  border-blue-600 dark:text-gray-50 dark:border-blue-500 active'
				: 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 text-gray-500 dark:text-gray-300',
		)}
	>
		<span class="inline-flex items-center gap-2 truncate">
			<ViewIcon type={view.displayType} class={cx(!active ? '!text-gray-500 dark:!text-gray-300' : '!font-semibold')} />
			{#if updating}
				<form on:submit|preventDefault|stopPropagation={update}>
					<input
						bind:this={input}
						type="text"
						bind:value={view.name.value}
						on:blur={update}
						on:keydown={(e) => {}}
						class="outline-none border-none p-0 h-4 !focus:outline-none !focus-within:outline-none text-xs"
					/>
				</form>
			{:else}
				<span title={view.name.value} class="truncate">{view.name.value}</span>
			{/if}
		</span>
		{#if active}
			<span id={view.id.value} class="w-4 inline-block" on:click|preventDefault|stopPropagation={() => (open = true)}>
				<i class="ti ti-dots" />
			</span>
		{/if}
	</a>
	{#if active}
		<Portal target="body">
			<Dropdown style="z-index: 50;" triggeredBy={`#${view.id.value}`} bind:open class="!z-[9999999] w-48">
				{#if $hasPermission('table:update_view_name')}
					<DropdownItem on:click={() => (updating = true)} class="text-xs font-normal inline-flex items-center gap-2">
						<i class="ti ti-pencil text-gray-600 dark:text-gray-50" />
						<span>{$t('Update View Name')}</span>
					</DropdownItem>
				{/if}
				{#if $hasPermission('table:duplicate_view')}
					<DropdownItem on:click={duplicateView} class="text-xs font-normal inline-flex items-center gap-2">
						<i class="ti ti-copy text-gray-600 dark:text-gray-50" />
						<span>{$t('Duplicate View')}</span>
					</DropdownItem>
				{/if}
				{#if $hasPermission('table:export')}
					<DropdownItem class="flex items-center justify-between">
						<span class="text-xs font-normal inline-flex items-center gap-2">
							<i class="ti ti-file-export text-gray-600 dark:text-gray-50" />
							{$t('Export')}
						</span>
						<i class="ti ti-chevron-right" />
					</DropdownItem>
					<Dropdown style="z-index: 50;" placement="right-start" class="w-48">
						<DropdownItem on:click={() => exportGrid('csv')} class="text-xs font-normal inline-flex items-center gap-2">
							<i class="ti ti-csv text-gray-600 dark:text-gray-50" />
							<span>{$t('Export CSV')}</span>
						</DropdownItem>
						<DropdownItem
							on:click={() => exportGrid('excel')}
							class="text-xs font-normal inline-flex items-center gap-2"
						>
							<i class="ti ti-file-spreadsheet text-gray-600 dark:text-gray-50" />
							<span>{$t('Export Excel')}</span>
						</DropdownItem>
						<DropdownItem
							on:click={() => exportGrid('json')}
							class="text-xs font-normal inline-flex items-center gap-2"
						>
							<i class="ti ti-json text-gray-600 dark:text-gray-50" />
							<span>{$t('Export Json')}</span>
						</DropdownItem>
					</Dropdown>
				{/if}
				{#if $hasPermission('table:create_form')}
					<DropdownItem
						on:click={() => {
							createFormFromView()
						}}
						class="text-xs font-normal inline-flex items-center gap-2"
					>
						<i class="ti ti-clipboard-text text-gray-600 dark:text-gray-50" />
						<span>{$t('create form from view')}</span>
					</DropdownItem>
				{/if}
				{#if $table.views.count > 1 && $hasPermission('table:delete_view')}
					<DropdownDivider />
					<DropdownItem class="text-red-600 text-xs font-normal inline-flex items-center gap-2" on:click={deleteView}>
						<i class="ti ti-trash" />
						<span>{$t('Delete View')}</span>
					</DropdownItem>
				{/if}
			</Dropdown>
		</Portal>
	{/if}
</div>
