<script lang="ts">
  import './i18n';
  import routes from '../.routify/routes.default';
  import {Router} from '@roxi/routify';
</script>

<main>
  <Router routes={routes} />
</main>